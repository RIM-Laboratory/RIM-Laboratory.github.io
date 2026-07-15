import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { publications, labInfo } from '../data';
import { FileText, Code, Video, Globe, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';

// Deterministic colored tag: each keyword string hashes to one of a fixed
// palette, so the same keyword always renders in the same color across all
// papers — a stable "colored keyword tag" look without a manual lookup table.
const TAG_PALETTE = [
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-cyan-100 text-cyan-700',
];
function tagColor(tag: string) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_PALETTE[h % TAG_PALETTE.length];
}

export default function Publications() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedPublications = isExpanded ? publications : publications.slice(0, 5);

  const highlightAuthor = (authorsStr: string) => {
    const parts = authorsStr.split(new RegExp(`(${labInfo.piName})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === labInfo.piName.toLowerCase() ? 
        <strong key={i} className="text-gray-900 font-semibold">{part}</strong> : 
        part
    );
  };

  return (
    <section id="publications" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Publications</h2>
          <p className="mt-4 text-lg text-gray-600">Recent research publications relevant to robotics, tactile sensing, dexterous manipulation, and embodied AI.</p>
        </div>

        <div className="space-y-8">
          <AnimatePresence initial={false}>
            {displayedPublications.map((pub, index) => (
              <PublicationCard key={pub.id} pub={pub} index={index} highlightAuthor={highlightAuthor} />
            ))}
          </AnimatePresence>
        </div>

        {publications.length > 5 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />
                </>
              ) : (
                <>
                  Show More <ChevronDown size={20} className="text-gray-500 group-hover:text-indigo-600 transition-colors" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PublicationCard({ pub, index, highlightAuthor }: { key?: number, pub: any, index: number, highlightAuthor: (str: string) => any }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -20, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="w-full md:w-1/3 flex-shrink-0">
        {!imgError ? (
          <img 
            src={pub.image} 
            alt={pub.title} 
            onError={() => setImgError(true)}
            className="w-full h-48 md:h-full object-cover rounded-xl bg-gray-50"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-48 md:h-full min-h-[12rem] bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-200">
            <ImageIcon size={32} className="mb-2 opacity-50" />
            <span className="text-sm font-medium">Image Placeholder</span>
            <span className="text-xs mt-1 text-center px-4">Upload {pub.image} to public/images/</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {pub.title}
        </h3>
        <p className="text-gray-600">
          {highlightAuthor(pub.authors)}
        </p>
        <p className="text-indigo-600 font-medium text-sm">
          {pub.venue} ({pub.year})
        </p>
        {pub.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {pub.tags.map((tag: string) => (
              <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColor(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {pub.abstract && pub.abstract !== "Abstract not available from DBLP. Please update manually." && (
          <p className="text-gray-500 text-sm leading-relaxed">
            {pub.abstract}
          </p>
        )}
        
        <div className="flex flex-wrap gap-3 pt-2">
          {pub.links?.pdf && pub.links.pdf !== "#" && (
            <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <FileText size={16} /> PDF
            </a>
          )}
          {pub.links?.code && (
            <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Code size={16} /> Code
            </a>
          )}
          {pub.links?.webpage && (
            <a href={pub.links.webpage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Globe size={16} /> Webpage
            </a>
          )}
          {pub.links?.video && (
            <a href={pub.links.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Video size={16} /> Video
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
