import { SITE, SOCIAL_LINKS, localizePath, type Locale } from '@config/site';
import type { Firepump } from '../../data/firepumps';

type Schema = Record<string, unknown>;

const toAbsoluteUrl = (pathOrUrl: string): string => new URL(pathOrUrl, SITE.url).toString();

const localizedValue = (value: string | { en: string; fr: string }, locale: Locale): string =>
  typeof value === 'string' ? value : value[locale];

const normalizedText = (value: string): string => value.replace(/\s+/g, ' ').trim();

export const buildOrganizationSchema = (): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.author,
  url: SITE.url,
  logo: toAbsoluteUrl('/email/shibaura-logo-mark.png'),
  sameAs: Object.values(SOCIAL_LINKS),
});

export const buildWebSiteSchema = (locale: Locale): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.title,
  url: SITE.url,
  inLanguage: locale,
  publisher: {
    '@type': 'Organization',
    name: SITE.author,
    url: SITE.url,
  },
});

export const buildAboutPageSchema = (canonicalUrl: string, locale: Locale): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: locale === 'fr' ? 'À propos' : 'About Us',
  url: canonicalUrl,
  inLanguage: locale,
  isPartOf: toAbsoluteUrl(localizePath('/', locale)),
});

export const buildContactPageSchema = (canonicalUrl: string, locale: Locale): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: locale === 'fr' ? 'Contact' : 'Contact',
  url: canonicalUrl,
  inLanguage: locale,
  isPartOf: toAbsoluteUrl(localizePath('/', locale)),
});

interface ProductSchemaOptions {
  pump: Firepump;
  locale: Locale;
  canonicalUrl: string;
  imageUrl: string;
}

export const buildProductSchema = ({
  pump,
  locale,
  canonicalUrl,
  imageUrl,
}: ProductSchemaOptions): Schema => {
  const additionalProperty = pump.keySpecs.slice(0, 8).map((spec) => ({
    '@type': 'PropertyValue',
    name: spec.label ?? spec.key,
    value: normalizedText(localizedValue(spec.value, locale).replace(/\n/g, ' / ')),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pump.title,
    description: normalizedText(`${pump.subtitle}. ${pump.valueProp}`),
    image: [imageUrl],
    url: canonicalUrl,
    brand: {
      '@type': 'Brand',
      name: 'Shibaura',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Shibaura',
    },
    model: pump.title,
    category: locale === 'fr' ? 'Pompe incendie portative' : 'Portable Fire Pump',
    additionalProperty,
  };
};

interface ProductBreadcrumbOptions {
  pump: Firepump;
  locale: Locale;
  canonicalUrl: string;
}

export const buildProductBreadcrumbSchema = ({
  pump,
  locale,
  canonicalUrl,
}: ProductBreadcrumbOptions): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: locale === 'fr' ? 'Accueil' : 'Home',
      item: toAbsoluteUrl(localizePath('/', locale)),
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: locale === 'fr' ? 'Produits' : 'Products',
      item: toAbsoluteUrl(localizePath('/products', locale)),
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: pump.title,
      item: canonicalUrl,
    },
  ],
});

interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
}

interface ItemListSchemaOptions {
  listName: string;
  canonicalUrl: string;
  items: ItemListEntry[];
}

export const buildItemListSchema = ({
  listName,
  canonicalUrl,
  items,
}: ItemListSchemaOptions): Schema => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: listName,
  url: canonicalUrl,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: item.url,
  })),
});
