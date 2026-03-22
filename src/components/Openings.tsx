import { motion } from 'motion/react';
import { openings, labInfo } from '../data';

export default function Openings() {
  return (
    <section id="openings" className="pt-8 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Openings</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              We are always looking for motivated students to join our team.
            </p>
          </div>

          <div className="space-y-8">
            {openings.map((opening, index) => (
              <motion.div
                key={opening.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{opening.title}</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 w-fit">
                    {opening.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">{opening.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {opening.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
