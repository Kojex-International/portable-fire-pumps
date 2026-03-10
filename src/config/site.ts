// Site configuration
export const SITE = {
  title: 'Portable Fire Pumps',
  description: 'High-performance portable fire pumps for fire prevention and disaster relief sectors',
  url: 'https://www.portable-fire-pumps.com',
  author: 'Kojex International',
} as const;

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

const NAV_ITEMS = [
  { name: { en: 'Home', fr: 'Accueil' }, path: '/' },
  {
    name: { en: 'Products', fr: 'Produits' },
    path: '/products',
    children: [
      { name: { en: 'Air cooled', fr: 'Refroidis par air' }, path: '/products/air-cooled' },
      { name: { en: 'Water cooled', fr: 'Refroidis par eau' }, path: '/products/water-cooled' },
    ],
  },
  {
    name: { en: 'Features', fr: 'Caractéristiques' },
    path: '/features',
    children: [
      { name: { en: 'Auto Relay System', fr: 'Système Auto Relay' }, path: '/features#auto-relay-system' },
      { name: { en: 'Pump Features', fr: 'Caractéristiques des pompes' }, path: '/features#pump-features' },
    ],
  },
  { name: { en: 'Distributors', fr: 'Distributeurs' }, path: '/distributors' },
  {
    name: { en: 'Resources', fr: 'Ressources' },
    path: '/resources',
    children: [
      { name: { en: 'Product Catalogs', fr: 'Catalogues de produits' }, path: '/resources#product-catalogs' },
      { name: { en: 'Pump Operation Manuals', fr: 'Manuels d’utilisation' }, path: '/resources#pump-instruction-manuals' },
      { name: { en: 'Parts Lists', fr: 'Listes de pièces' }, path: '/resources#parts-lists' },
      { name: { en: 'Storage Notes', fr: 'Consignes d’entreposage' }, path: '/resources#fire-pump-storage-notes' },
    ],
  },
  { name: { en: 'About', fr: 'À propos' }, path: '/about-us' },
] as const;

const stripLocalePrefix = (pathname: string) =>
  pathname.replace(/^\/(en|fr)(?=\/|$)/, '');

export const getLocaleFromPathname = (pathname: string): Locale => {
  if (pathname.startsWith('/fr')) {
    return 'fr';
  }
  return 'en';
};

export const localizePath = (path: string, locale: Locale): string => {
  const stripped = stripLocalePrefix(path);
  const normalized = stripped === '' ? '/' : stripped;
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
};

export const getNavigation = (locale: Locale) =>
  NAV_ITEMS.map((item) => ({
    name: locale === 'fr' ? item.name.fr : item.name.en,
    href: localizePath(item.path, locale),
    children: item.children?.map((child) => ({
      name: locale === 'fr' ? child.name.fr : child.name.en,
      href: localizePath(child.path, locale),
    })),
  }));

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/shibaura_bousai',
  facebook: 'https://www.facebook.com/profile.php?id=61556205597560',
  instagram: 'https://www.instagram.com/shibaura_fire_pump/',
  youtube: 'https://www.youtube.com/@shibaura6004',
} as const;
