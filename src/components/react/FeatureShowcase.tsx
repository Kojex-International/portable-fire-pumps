import { motion } from 'motion/react';

import ft510Img from '@assets/shibaura-ft510-portable-fire-pump-side-view.jpg';
import ft400Img from '@assets/shibaura-ft400-portable-fire-pump-side-view.jpg';
import tf516mhImg from '@assets/shibaura-tf516mh-portable-fire-pump-side-view.jpg';
import p572sImg from '@assets/shibaura-p572s-portable-fire-pump-side-view.jpg';
import fk500Img from '@assets/shibaura-fk500-portable-fire-pump-side-view.jpg';
import ff500arImg from '@assets/shibaura-ff500ar-portable-fire-pump-side-view.jpg';
import shibauraLogoMark from '@assets/shibaura-logo-mark.svg?url';

const featuresEn = [
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

const featuresFr = [
  {
    title: 'FT510-A',
    description: 'Pompe haut débit refroidie à l’air conçue pour une intervention rapide et un débit constant.',
    image: ft510Img,
    slug: 'ft510-a',
  },
  {
    title: 'FT300-A / FT400-A1',
    description: 'Modèles compacts et légers adaptés au déploiement rapide et au transport.',
    image: ft400Img,
    slug: 'ft300-400-a',
  },
  {
    title: 'TF516MH-AB',
    description: 'Pompe ultra-compacte conçue pour la mobilité et l’installation sur véhicule.',
    image: tf516mhImg,
    slug: 'tf516mh-ab',
  },
  {
    title: 'P572S-A',
    description: 'Débit de refoulement élevé pour les opérations exigeantes.',
    image: p572sImg,
    slug: 'p572s-a',
  },
  {
    title: 'FK500-A',
    description: 'Performance équilibrée et fiabilité d’un système refroidi à l’eau.',
    image: fk500Img,
    slug: 'fk500-a',
  },
  {
    title: 'FF500AR-A',
    description: 'Système auto-relais conçu pour le transfert d’eau sur de longues distances.',
    image: ff500arImg,
    slug: 'ff500ar-a',
  },
];

type FeatureShowcaseProps = {
  detailsBaseHref?: string;
  locale?: 'en' | 'fr';
};

export default function FeatureShowcase({ detailsBaseHref = '/products', locale = 'en' }: FeatureShowcaseProps) {
  const features = locale === 'fr' ? featuresFr : featuresEn;
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
                className="w-full h-full object-contain p-0 sm:p-4"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-slate-950/82 via-slate-900/52 via-slate-900/20 to-transparent px-6 pb-2 pt-4 text-white">
              <h3 className="flex items-center gap-2 text-lg font-bold leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                <span
                  aria-hidden="true"
                  className="w-7 h-7 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
                  style={{
                    backgroundColor: 'currentColor',
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
                <span>{feature.title}</span>
              </h3>
              <p className="text-sm text-white/95 mt-1 leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{feature.description}</p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
