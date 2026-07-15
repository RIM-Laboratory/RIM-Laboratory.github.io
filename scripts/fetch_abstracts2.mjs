import yaml from 'js-yaml';
import fs from 'node:fs';
const raw = fs.readFileSync('/home/dell/RIM-Laboratory.github.io/src/data.yaml','utf8');
const data = yaml.load(raw);
const UA = 'RIM-Lab-Web/1.0 (mailto:xiaochx@shanghaitech.edu.cn)';
const OUT = '/tmp/abstracts.json';
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT,'utf8')) : {};
const sleep = ms => new Promise(r=>setTimeout(r,ms));
// Extract arxiv id from arxiv.org URLs AND 10.48550/arXiv.* DOIs
function arxivId(url){
  const s = String(url||'');
  let m = s.match(/arxiv\.org\/(?:abs|pdf)\/([0-9]{4}\.[0-9]{4,5}(v\d+)?)/i);
  if(m) return m[1];
  m = s.match(/10\.48550\/arXiv\.([0-9]{4}\.[0-9]{4,5}(v\d+)?)/i);
  if(m) return m[1];
  return null;
}
async function get(url,{json=true}={}){
  const c=new AbortController(); const t=setTimeout(()=>c.abort(),25000);
  try{ const r=await fetch(url,{headers:{'User-Agent':UA},signal:c.signal});
    if(!r.ok) return null; return json?await r.json():await r.text();
  }catch{return null}finally{clearTimeout(t)}
}
async function fetchArxiv(id){
  const xml=await get(`https://export.arxiv.org/api/query?id_list=${id}`,{json:false});
  if(!xml) return null;
  const m=xml.match(/<summary>([\s\S]*?)<\/summary>/);
  return m?m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim()||null:null;
}
async function fetchS2(title){
  const q=encodeURIComponent(title);
  const j=await get(`https://api.semanticscholar.org/graph/v1/paper/search?query=${q}&limit=3&fields=title,abstract`);
  if(!j||!j.data) return null;
  const norm=s=>(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const want=norm(title);
  const best=j.data.find(p=>norm(p.title)===want)||j.data.find(p=>norm(p.title).slice(0,60)===want.slice(0,60))||j.data.find(p=>p.abstract)||j.data[0];
  return best&&best.abstract?best.abstract.replace(/\s+/g,' ').trim():null;
}
for(const pub of data.publications){
  if(out[pub.id]&&out[pub.id].abstract){console.error(`[${pub.id}] cached`);continue;}
  const pdf=pub.links?.pdf||'';
  const axid=arxivId(pdf);
  let abs=null,source='none';
  if(axid){
    for(let i=0;i<3&&!abs;i++){abs=await fetchArxiv(axid);if(!abs)await sleep(2000*(i+1));}
    source=abs?`arxiv:${axid}`:'arxiv:miss';
  }
  if(!abs){
    for(let i=0;i<5&&!abs;i++){abs=await fetchS2(pub.title);if(!abs)await sleep(9000*(i+1));}
    source=abs?'semantic-scholar':'none';
  }
  out[pub.id]={title:pub.title,year:pub.year,source,abstract:abs};
  console.error(`[${pub.id}] ${source.padEnd(20)} ${abs?'OK':'MISS'}  ${pub.title.slice(0,50)}`);
  fs.writeFileSync(OUT,JSON.stringify(out,null,2));
  await sleep(3000); // gentle pacing to avoid 429
}
const got=Object.values(out).filter(v=>v.abstract).length;
console.error(`\nDone. ${got}/${data.publications.length} abstracts.`);
