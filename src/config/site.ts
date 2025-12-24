// Site configuration
export const SITE = {
  title: 'Portable Fire Pumps',
  description: 'High-performance portable fire pumps for fire prevention and disaster relief sectors',
  url: 'https://www.portable-fire-pumps.com',
  author: 'Kojex International',
} as const;

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number] | 'default';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Applications', path: '/applications' },
  { name: 'Distributors', path: '/distributors' },
  { name: 'Resources', path: '/resources' },
  { name: 'Request a Quote', path: '/request-a-quote' },
] as const;

const stripLocalePrefix = (pathname: string) =>
  pathname.replace(/^\/(en|fr)(?=\/|$)/, '');

export const getLocaleFromPathname = (pathname: string): Locale => {
  if (pathname.startsWith('/fr')) {
    return 'fr';
  }
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'default';
};

export const localizePath = (path: string, locale: Locale): string => {
  const stripped = stripLocalePrefix(path);
  const normalized = stripped === '' ? '/' : stripped;

  if (locale === 'default') {
    return normalized;
  }

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
};

export const getNavigation = (locale: Locale) =>
  NAV_ITEMS.map((item) => ({
    name: item.name,
    href: localizePath(item.path, locale),
  }));

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/yourcompany',
  twitter: 'https://twitter.com/yourcompany',
  facebook: 'https://facebook.com/yourcompany',
} as const;
