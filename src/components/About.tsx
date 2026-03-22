import { motion } from 'motion/react';
import { labInfo } from '../data';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {labInfo.bio}
          </p>
          
          <div className="pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Interests</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {labInfo.interests.map((interest, index) => (
                <span key={index} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm font-medium shadow-sm">
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
