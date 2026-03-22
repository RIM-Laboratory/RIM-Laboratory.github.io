import { useRef } from 'react';
import { motion } from 'motion/react';
import { researchAreas } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Research() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="research" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Research Areas</h2>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full bg-white border border-gray-100 text-gray-800 hover:text-indigo-600 hover:scale-110 transition-all shadow-lg hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar px-4 md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(Array.isArray(researchAreas) ? researchAreas : []).map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow min-w-[300px] md:min-w-[350px] flex-1 snap-start"
                >
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full bg-white border border-gray-100 text-gray-800 hover:text-indigo-600 hover:scale-110 transition-all shadow-lg hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
