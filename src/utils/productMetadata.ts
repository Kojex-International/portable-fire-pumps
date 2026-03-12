import type { Firepump, FirepumpLocale } from '../data/firepumps';

interface ProductMetadataInput {
  pump: Firepump;
  locale: FirepumpLocale;
  siteUrl: string;
  pathname: string;
}

export interface ProductMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl: string;
}

const normalizePath = (pathname: string) => (pathname.startsWith('/') ? pathname : `/${pathname}`);

export const getProductMetadata = ({
  pump,
  locale,
  siteUrl,
  pathname,
}: ProductMetadataInput): ProductMetadata => {
  const title =
    locale === 'fr'
      ? `${pump.title} Pompe incendie portative | Shibaura | Kojex`
      : `${pump.title} Portable Fire Pump | Shibaura | Kojex`;

  const description = `${pump.subtitle}. ${pump.valueProp}`.replace(/\s+/g, ' ').trim();
  const canonicalUrl = new URL(normalizePath(pathname), siteUrl).toString();
  const ogImageUrl = new URL(pump.image.src, siteUrl).toString();

  return {
    title,
    description,
    canonicalUrl,
    ogImageUrl,
  };
};

