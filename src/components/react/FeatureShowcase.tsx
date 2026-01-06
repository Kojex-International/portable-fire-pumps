import { motion } from 'motion/react';
import { Droplet, Flame, Gauge, Wind, Shield, Repeat } from 'lucide-react';

import ft510Img from '@assets/ft510.jpg';
import ft400Img from '@assets/ft400.jpg';
import tf516mhImg from '@assets/tf516mh.jpg';
import p572sImg from '@assets/p572s.jpg';
import fk500Img from '@assets/fk500.jpg';
import ff500arImg from '@assets/ff500ar.jpg';

const features = [
  {
    icon: Flame,
    title: 'P510-A',
    description: 'High-output air-cooled pump for rapid response and reliable flow.',
    image: ft510Img,
  },
  {
    icon: Droplet,
    title: 'FT300-A / FT400-A1',
    description: 'Compact, lightweight models for quick deployment and transport.',
    image: ft400Img,
  },
  {
    icon: Wind,
    title: 'TF516MH-AB',
    description: 'Smallest-in-class pump built for mobility and vehicle mounting.',
    image: tf516mhImg,
  },
  {
    icon: Gauge,
    title: 'P572S-A',
    description: 'Highest discharge performance for demanding operations.',
    image: p572sImg,
  },
  {
    icon: Shield,
    title: 'FK500-A',
    description: 'Durable, balanced performance with water-cooled reliability.',
    image: fk500Img,
  },
  {
    icon: Repeat,
    title: 'FF500AR-A',
    description: 'Auto-relay system for long-distance water delivery.',
    image: ff500arImg,
  },
];

export default function FeatureShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={feature.image.src}
                alt={feature.title}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
              
              {/* Icon overlay */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg"
              >
                <feature.icon className="w-6 h-6 text-blue-600" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200 opacity-90">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
