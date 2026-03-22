import { motion } from 'motion/react';
import { gallery } from '../data';
import { Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? gallery : (gallery || []).slice(0, 6);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
          <p className="mt-4 text-lg text-gray-600">A glimpse into our lab and activities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible?.map((item: any, index: number) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {(gallery?.length || 0) > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-900 hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryItem({ item, index }: { item: any; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] shadow-sm hover:shadow-md transition-all"
    >
      {!imgError ? (
        <img
          src={item.image}
          alt={item.caption}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-200">
          <ImageIcon size={32} className="mb-2 opacity-50" />
          <span className="text-sm font-medium">Image Placeholder</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <p className="text-white p-6 font-medium text-sm sm:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}
