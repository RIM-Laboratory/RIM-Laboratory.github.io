import { useState } from 'react';
import { motion } from 'motion/react';
import { news } from '../data';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function News() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedNews = isExpanded ? news : news.slice(0, 3);

  return (
    <section id="news" className="pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
        </div>

        <div className="relative border-l border-gray-200 ml-3 md:ml-6 space-y-8">
          {displayedNews.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
              className="relative pl-8 md:pl-12"
            >
              <span className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit mb-2 sm:mb-0 sm:mr-4 whitespace-nowrap">
                  {item.date}
                </span>
                <p className="text-gray-700 text-base leading-relaxed flex-1">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                      {item.content}
                    </a>
                  ) : (
                    item.content
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {news.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
