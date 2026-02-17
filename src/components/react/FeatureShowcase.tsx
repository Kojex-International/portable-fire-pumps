import { motion } from 'motion/react';

import ft510Img from '@assets/ft510.jpg';
import ft400Img from '@assets/ft400.jpg';
import tf516mhImg from '@assets/tf516mh.jpg';
import p572sImg from '@assets/p572s.jpg';
import fk500Img from '@assets/fk500.jpg';
import ff500arImg from '@assets/ff500ar.jpg';
import shibauraLogoMark from '@assets/shibaura-logo-mark.svg?url';

const features = [
  {
    title: 'FT510-A',
    description: 'High-output air-cooled pump for rapid response and reliable flow.',
    image: ft510Img,
    slug: 'ft510-a',
  },
  {
    title: 'FT300-A / FT400-A1',
    description: 'Compact, lightweight models for quick deployment and transport.',
    image: ft400Img,
    slug: 'ft300-400-a',
  },
  {
    title: 'TF516MH-AB',
    description: 'Smallest-in-class pump built for mobility and vehicle mounting.',
    image: tf516mhImg,
    slug: 'tf516mh-ab',
  },
  {
    title: 'P572S-A',
    description: 'Highest discharge performance for demanding operations.',
    image: p572sImg,
    slug: 'p572s-a',
  },
  {
    title: 'FK500-A',
    description: 'Durable, balanced performance with water-cooled reliability.',
    image: fk500Img,
    slug: 'fk500-a',
  },
  {
    title: 'FF500AR-A',
    description: 'Auto-relay system for long-distance water delivery.',
    image: ff500arImg,
    slug: 'ff500ar-a',
  },
];

type FeatureShowcaseProps = {
  detailsBaseHref?: string;
};

export default function FeatureShowcase({ detailsBaseHref = '/products' }: FeatureShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.a
          key={feature.title}
          href={`${detailsBaseHref}/${feature.slug}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group block animate-fadeInUp transition-transform duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            {/* Image */}
            <div className="relative h-72 overflow-hidden bg-white">
              <motion.img
                src={feature.image.src}
                alt={feature.title}
                className="w-full h-full object-contain p-4"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-52 bg-linear-to-t from-slate-900/90 via-slate-900/60 via-slate-900/30 to-transparent opacity-90 pointer-events-none" />
              
              {/* Icon overlay */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="w-10 h-10 brand-gradient-bg"
                  style={{
                    WebkitMaskImage: `url(${shibauraLogoMark})`,
                    maskImage: `url(${shibauraLogoMark})`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 pt-6 text-white drop-shadow-lg">
              <h3 className="text-lg font-semibold leading-tight">{feature.title}</h3>
              <p className="text-sm text-white/85 mt-0.5 leading-snug">{feature.description}</p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
