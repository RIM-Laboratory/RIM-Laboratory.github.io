import { useEffect, useRef } from 'react';

export default function HeroGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = window.innerWidth / 2;
    let score = 0;
    let globalTotal = 0;
    let globalLoaded = false;
    const COUNTER_URL = "https://api.counterapi.dev/v1/rim-lab/clawgame-grabs";
    fetch(COUNTER_URL).then(r => r.ok ? r.json() : Promise.reject()).then((d: { count?: number }) => { if (typeof d.count === "number") globalTotal = d.count; globalLoaded = true; }).catch(() => { globalLoaded = true; });

    // Claw state
    const IDLE_Y = 80;
    let clawX = window.innerWidth / 2;
    let clawY = IDLE_Y;
    let clawState: 'idle' | 'dropping' | 'retracting' = 'idle';
    let grabbedItem: any = null;

    const items: { x: number; y: number; speed: number; color: string; width: number; height: number; type: string; baseY: number; movement: "slide" | "jump"; phase: number; jumpHeight: number }[] = [];
    const colors = ['#818cf8', '#34d399', '#f472b6', '#fbbf24', '#38bdf8'];
    const itemTypes = ['box', 'circle', 'triangle', 'hexagon', 'diamond'];

    const drawItem = (ctx: CanvasRenderingContext2D, item: any, x: number, y: number) => {
      ctx.fillStyle = item.color;
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      
      const cx = x + item.width / 2;
      const cy = y + item.height / 2;
      const r = item.width / 2;

      switch (item.type) {
        case 'circle':
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          break;
        case 'triangle':
          ctx.moveTo(cx, y);
          ctx.lineTo(x + item.width, y + item.height);
          ctx.lineTo(x, y + item.height);
          ctx.closePath();
          break;
        case 'diamond':
          ctx.moveTo(cx, y);
          ctx.lineTo(x + item.width, cy);
          ctx.lineTo(cx, y + item.height);
          ctx.lineTo(x, cy);
          ctx.closePath();
          break;
        case 'hexagon':
          for (let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j;
            const hx = cx + r * Math.cos(angle);
            const hy = cy + r * Math.sin(angle);
            if (j === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          break;
        case 'box':
        default:
          ctx.rect(x, y, item.width, item.height);
          break;
      }
      ctx.fill();
      ctx.stroke();
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (clawState === 'idle') {
        clawState = 'dropping';
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);

    let lastSpawn = 0;

    const loop = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#0f172a'; // Slate 900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#1e293b'; // Slate 800
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 100) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw score
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.font = 'bold 240px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(score.toString(), canvas.width / 2, canvas.height / 2);

      // Draw HUD: global counter + your score
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = "bold 15px system-ui";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillText(`Total grabbed (all players): ${globalLoaded ? globalTotal : "..."}`, 16, 74);
      ctx.fillStyle = "rgba(125, 211, 252, 0.95)";
      ctx.fillText(`You: ${score}`, 16, 96);

      // Conveyor belt
      const beltY = canvas.height - 80;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, beltY, canvas.width, 80);
      
      // Spawn items
      if (timestamp - lastSpawn > 1500) {
        const movement = Math.random() < 0.4 ? "jump" : "slide";
        const baseY = beltY + 20;
        items.push({
          x: -50,
          y: baseY,
          baseY,
          movement,
          phase: Math.random() * Math.PI * 2,
          jumpHeight: 45 + Math.random() * 30,
          speed: Math.random() * 2 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          width: 40,
          height: 40,
          type: itemTypes[Math.floor(Math.random() * itemTypes.length)]
        });
        lastSpawn = timestamp;
      }

      // Update and draw items
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.x += item.speed;
        if (item.movement === "jump") {
          item.y = item.baseY - Math.abs(Math.sin(item.x * 0.04 + item.phase)) * item.jumpHeight;
        }

        drawItem(ctx, item, item.x, item.y);

        if (item.x > canvas.width + 50) {
          items.splice(i, 1);
        }
      }

      // Update Claw
      if (clawState === 'idle') {
        clawX += (mouseX - clawX) * 0.1;
      } else if (clawState === 'dropping') {
        clawY += 20;
        
        if (!grabbedItem) {
          for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            if (
              clawX > item.x - 20 && 
              clawX < item.x + item.width + 20 &&
              clawY + 40 > item.y &&
              clawY < item.y + item.height
            ) {
              grabbedItem = item;
              items.splice(i, 1);
              clawState = 'retracting';
              break;
            }
          }
        }

        if (clawY > beltY - 20) {
          clawState = 'retracting';
        }
      } else if (clawState === 'retracting') {
        clawY -= 15;
        if (clawY <= IDLE_Y) {
          clawY = IDLE_Y;
          clawState = 'idle';
          if (grabbedItem) {
            score++;
            globalTotal++;
            fetch(COUNTER_URL + "/up").then(r => r.ok ? r.json() : Promise.reject()).then((d: { count?: number }) => { if (typeof d.count === "number") globalTotal = d.count; }).catch(() => {});
            grabbedItem = null;
          }
        }
      }

      // Draw Claw
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(clawX, 0);
      ctx.lineTo(clawX, clawY);
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(clawX - 25, clawY, 50, 20);

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const fingerSpread = grabbedItem ? 20 : (clawState === 'dropping' ? 40 : 25);
      
      ctx.beginPath();
      ctx.moveTo(clawX - 20, clawY + 20);
      ctx.lineTo(clawX - fingerSpread, clawY + 45);
      ctx.lineTo(clawX - fingerSpread + 10, clawY + 60);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(clawX + 20, clawY + 20);
      ctx.lineTo(clawX + fingerSpread, clawY + 45);
      ctx.lineTo(clawX + fingerSpread - 10, clawY + 60);
      ctx.stroke();

      if (grabbedItem) {
        drawItem(ctx, grabbedItem, clawX - grabbedItem.width / 2, clawY + 25);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-900/40 pointer-events-none"></div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-mono pointer-events-none opacity-50">
        [ CLICK TO GRAB ]
      </div>
    </div>
  );
}
