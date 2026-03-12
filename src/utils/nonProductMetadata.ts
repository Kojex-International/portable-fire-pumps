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
  | 'features'
  | 'resources'
  | 'distributors'
  | 'contact'
  | 'contactThanks'
  | 'about';

const NON_PRODUCT_PAGE_METADATA: Record<NonProductPageKey, Record<Locale, LocalizedMeta>> = {
  home: {
    en: {
      title: 'Portable Fire Pumps | Shibaura by Kojex',
      description:
        'Exclusive North American distributor for Shibaura portable fire pumps with product guidance, resources, and support.',
    },
    fr: {
      title: 'Portable Fire Pumps | Shibaura par Kojex',
      description:
        'Distributeur exclusif en Amérique du Nord des pompes incendie portatives Shibaura avec ressources techniques et accompagnement.',
    },
  },
  products: {
    en: {
      title: 'Products | Portable Fire Pumps',
      description:
        'Browse Shibaura portable fire pumps engineered for wildfire response, municipal support, and emergency water transfer.',
    },
    fr: {
      title: 'Produits | Portable Fire Pumps',
      description:
        'Consultez la gamme de pompes incendie portatives Shibaura pour la lutte contre les feux de forêt et les interventions d’urgence.',
    },
  },
  productsAirCooled: {
    en: {
      title: 'Air-Cooled Pumps | Portable Fire Pumps',
      description:
        'Explore air-cooled Shibaura portable fire pumps built for lightweight rapid deployment and dependable field performance.',
    },
    fr: {
      title: 'Pompes refroidies à l’air | Portable Fire Pumps',
      description:
        'Découvrez les pompes incendie portatives Shibaura refroidies à l’air, légères et conçues pour un déploiement rapide.',
    },
  },
  productsWaterCooled: {
    en: {
      title: 'Water-Cooled Pumps | Portable Fire Pumps',
      description:
        'Explore water-cooled Shibaura portable fire pumps designed for sustained high-output firefighting operations.',
    },
    fr: {
      title: 'Pompes refroidies à l’eau | Portable Fire Pumps',
      description:
        'Découvrez les pompes incendie portatives Shibaura refroidies à l’eau, conçues pour des opérations soutenues à haut débit.',
    },
  },
  features: {
    en: {
      title: 'Features | Portable Fire Pumps',
      description:
        'Discover Auto Relay operation and core engineering features that support reliable portable fire pump performance.',
    },
    fr: {
      title: 'Caractéristiques | Portable Fire Pumps',
      description:
        'Découvrez le système Auto Relay et les principales caractéristiques techniques des pompes incendie portatives Shibaura.',
    },
  },
  resources: {
    en: {
      title: 'Resources | Portable Fire Pumps',
      description:
        'Access Shibaura product catalogs, operation manuals, parts lists, and storage guidance in one place.',
    },
    fr: {
      title: 'Ressources | Portable Fire Pumps',
      description:
        'Accédez aux catalogues Shibaura, aux manuels d’utilisation, aux listes de pièces et aux consignes d’entreposage.',
    },
  },
  distributors: {
    en: {
      title: 'Distributors | Portable Fire Pumps',
      description:
        'Find verified distributor partners for Shibaura portable fire pumps with regional contact information.',
    },
    fr: {
      title: 'Distributeurs | Portable Fire Pumps',
      description:
        'Trouvez des partenaires distributeurs vérifiés des pompes incendie portatives Shibaura avec leurs coordonnées régionales.',
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
      title: 'About Us | Portable Fire Pumps',
      description:
        'Learn about Kojex International and its role as exclusive North American distributor for Shibaura portable fire pumps.',
    },
    fr: {
      title: 'À propos | Portable Fire Pumps',
      description:
        'Découvrez Kojex International et son rôle de distributeur exclusif nord-américain des pompes incendie portatives Shibaura.',
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
