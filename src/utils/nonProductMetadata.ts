import { SITE, type Locale } from '@config/site';

type LocalizedMeta = {
  title: string;
  description: string;
};

type NonProductPageKey =
  | 'home'
  | 'products'
  | 'productsAirCooled'
  | 'productsWaterCooled'
  | 'useCases'
  | 'relayPumping'
  | 'wildlandPumps'
  | 'features'
  | 'resources'
  | 'distributors'
  | 'contact'
  | 'contactThanks'
  | 'about';

const NON_PRODUCT_PAGE_METADATA: Record<NonProductPageKey, Record<Locale, LocalizedMeta>> = {
  home: {
    en: {
      title: 'Portable Fire Pumps in North America | Shibaura by Kojex',
      description:
        'Kojex is the exclusive North American distributor for Shibaura portable fire pumps with product selection guidance, technical resources, and support.',
    },
    fr: {
      title: 'Pompes à incendie portatives en Amérique du Nord | Shibaura par Kojex',
      description:
        'Kojex est le distributeur exclusif nord-américain des pompes à incendie portatives Shibaura avec accompagnement, ressources techniques et soutien.',
    },
  },
  products: {
    en: {
      title: 'Portable Fire Pump Models | Shibaura Lineup',
      description:
        'Browse Shibaura portable fire pump models for wildfire response, municipal support, and emergency water transfer operations.',
    },
    fr: {
      title: 'Modèles de pompes à incendie portatives | Gamme Shibaura',
      description:
        'Consultez les modèles de pompes à incendie portatives Shibaura pour les feux de forêt, les interventions municipales et les transferts d’eau d’urgence.',
    },
  },
  productsAirCooled: {
    en: {
      title: 'Air-Cooled Portable Fire Pumps | Shibaura',
      description:
        'Explore lightweight air-cooled Shibaura portable fire pumps designed for rapid deployment and dependable field performance.',
    },
    fr: {
      title: 'Pompes à incendie portatives refroidies à l’air | Shibaura',
      description:
        'Découvrez les pompes à incendie portatives Shibaura refroidies à l’air, légères et adaptées aux déploiements rapides sur le terrain.',
    },
  },
  productsWaterCooled: {
    en: {
      title: 'Water-Cooled Portable Fire Pumps | Shibaura',
      description:
        'Explore water-cooled Shibaura portable fire pumps built for sustained high-output operations and relay pumping scenarios.',
    },
    fr: {
      title: 'Pompes à incendie portatives refroidies à l’eau | Shibaura',
      description:
        'Découvrez les pompes à incendie portatives Shibaura refroidies à l’eau, conçues pour les opérations soutenues à haut débit et le pompage en relais.',
    },
  },
  useCases: {
    en: {
      title: 'Portable Fire Pump Use Cases | Remote, Wildfire, Relay',
      description:
        'Explore portable fire pump use cases for remote firefighting, wildfire response, limited-hydrant operations, and long-distance water delivery.',
    },
    fr: {
      title: 'Cas d’usage des pompes à incendie portatives | Milieu éloigné, feux de forêt, relais',
      description:
        'Découvrez les cas d’usage des pompes à incendie portatives pour les interventions éloignées, les feux de forêt, les zones peu équipées en hydrants et l’acheminement d’eau sur longue distance.',
    },
  },
  relayPumping: {
    en: {
      title: 'Long-Distance Relay Pumping | Portable Fire Pumps',
      description:
        'Learn how relay pumping supports long-distance water supply and which portable fire pumps suit sustained relay operations.',
    },
    fr: {
      title: 'Pompage en relais sur longue distance | Portable Fire Pumps',
      description:
        'Découvrez comment le pompage en relais soutient l’acheminement d’eau sur longue distance et quelles pompes conviennent aux opérations soutenues sur le terrain.',
    },
  },
  wildlandPumps: {
    en: {
      title: 'Portable Fire Pumps for Rural and Remote Firefighting | Portable Fire Pumps',
      description:
        'Explore portable fire pumps for rural and remote firefighting, including wildland response, limited-hydrant areas, and variable water source conditions.',
    },
    fr: {
      title: 'Pompes portatives pour la lutte incendie en milieu rural et isolé | Portable Fire Pumps',
      description:
        'Découvrez les pompes à incendie portatives adaptées aux interventions rurales, aux sites isolés, aux zones peu équipées en hydrants et aux prises d’eau variables.',
    },
  },
  features: {
    en: {
      title: 'Portable Fire Pump Features | Auto Relay & Engineering',
      description:
        'Discover Auto Relay operation and core engineering features that support reliable portable fire pump performance in field conditions.',
    },
    fr: {
      title: 'Caractéristiques des pompes à incendie portatives | Auto-relais',
      description:
        'Découvrez le système Auto Relay et les principales caractéristiques techniques des pompes à incendie portatives Shibaura.',
    },
  },
  resources: {
    en: {
      title: 'Portable Fire Pump Resources | Manuals, Parts & Catalogs',
      description:
        'Access Shibaura product catalogs, operation manuals, parts lists, and storage guidance in one place for field teams.',
    },
    fr: {
      title: 'Ressources pompes à incendie portatives | Manuels, pièces et catalogues',
      description:
        'Accédez aux catalogues Shibaura, aux manuels d’utilisation, aux listes de pièces et aux consignes d’entreposage.',
    },
  },
  distributors: {
    en: {
      title: 'Portable Fire Pump Distributors | North America',
      description:
        'Find verified North American distributors for Shibaura portable fire pumps, with regional contacts and support details.',
    },
    fr: {
      title: 'Distributeurs de pompes à incendie portatives | Amérique du Nord',
      description:
        'Trouvez des distributeurs Shibaura vérifiés en Amérique du Nord avec coordonnées régionales et soutien technique.',
    },
  },
  contact: {
    en: {
      title: 'Contact | Portable Fire Pumps',
      description:
        'Contact Kojex International for portable fire pump quotes, distributor inquiries, and technical support.',
    },
    fr: {
      title: 'Contact | Portable Fire Pumps',
      description:
        'Contactez Kojex International pour les soumissions, les demandes distributeur et le soutien technique.',
    },
  },
  contactThanks: {
    en: {
      title: 'Thank You | Portable Fire Pumps',
      description: 'Confirmation page for Portable Fire Pumps contact form submissions.',
    },
    fr: {
      title: 'Merci | Portable Fire Pumps',
      description: 'Page de confirmation des demandes envoyées à Portable Fire Pumps.',
    },
  },
  about: {
    en: {
      title: 'About Kojex International | Shibaura Distributor',
      description:
        'Learn about Kojex International and its role as exclusive North American distributor for Shibaura portable fire pumps.',
    },
    fr: {
      title: 'À propos de Kojex International | Distributeur Shibaura',
      description:
        'Découvrez Kojex International et son rôle de distributeur exclusif nord-américain des pompes à incendie portatives Shibaura.',
    },
  },
};

const normalizePath = (pathname: string): string => {
  if (!pathname) return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};

type NonProductMetadataOptions = {
  pageKey: NonProductPageKey;
  locale: Locale;
  pathname: string;
  ogImageSrc?: string;
};

export const getNonProductMetadata = ({
  pageKey,
  locale,
  pathname,
  ogImageSrc,
}: NonProductMetadataOptions) => {
  const localized = NON_PRODUCT_PAGE_METADATA[pageKey][locale];
  const canonicalUrl = new URL(normalizePath(pathname), SITE.url).toString();
  const ogImageUrl = ogImageSrc ? new URL(ogImageSrc, SITE.url).toString() : undefined;

  return {
    title: localized.title,
    description: localized.description,
    canonicalUrl,
    ogImageUrl,
  };
};
