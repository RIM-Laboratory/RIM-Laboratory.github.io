import { motion } from 'motion/react';
import { labInfo } from '../data';
import { Mail, MapPin } from 'lucide-react';
import HeroGame from './HeroGame';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Game Background */}
      <HeroGame />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pointer-events-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Welcome to <span className="text-indigo-400">{labInfo.shortName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium">
            {labInfo.name}
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {labInfo.institution}
          </p>
          <p className="text-md text-gray-300 max-w-2xl mx-auto flex items-center gap-2 justify-center">
            <MapPin size={18} /> {labInfo.address}
          </p>
          
          <div className="flex justify-center pt-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 text-white backdrop-blur-sm rounded-full border border-white/20">
              <Mail size={20} />
              <img 
                src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="20"><text x="0" y="15" fill="white" font-family="system-ui, sans-serif" font-size="16" font-weight="500">${labInfo.email}</text></svg>`)}`} 
                alt="Contact Email" 
                className="h-5"
              />
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">About Us</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-4xl mx-auto">
              {labInfo.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {labInfo.interests.map((interest, index) => (
                <span key={index} className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium shadow-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
