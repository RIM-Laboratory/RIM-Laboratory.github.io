import { motion } from 'motion/react';
import { patents } from '../data';
import { FileText } from 'lucide-react';

export default function Patents() {
  if (!patents || patents.length === 0) return null;

  return (
    <section id="patents" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Patents & Tech Transfer</h2>
          </div>

          <div className="space-y-6">
            {patents.map((patent: any, index: number) => (
              <motion.div
                key={patent.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <FileText size={20} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{patent.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                      <span className="font-medium text-indigo-600">{patent.inventors}</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        {patent.number}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        {patent.date}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        patent.status.includes('Granted') || patent.status.includes('授权') 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {patent.status}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {patent.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
