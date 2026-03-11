import type { ImageMetadata } from 'astro';
import type { HeroFeatureLabelKey } from '../../i18n/heroFeatureLabels';
import type { SpecTableGroup } from './spec-types';

export interface FirepumpFeature {
  label: string;
  icon: string;
}

export type LocalizedValue = {
  en: string;
  fr: string;
};

export type FirepumpLocale = 'en' | 'fr';

export interface Firepump {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  valueProp: string;
  icon: string;
  image: ImageMetadata;
  graphImage: ImageMetadata;
  manualPdf?: string;
  aliases?: string[];
  features: FirepumpFeature[];
  keySpecs: { key: HeroFeatureLabelKey; label?: string; value: string | LocalizedValue; icon: string }[];
  benefits: { title: string; description: string }[];
  specsTable: {
    columns: string[];
    groups: SpecTableGroup[];
  };
  performance: { label: string; value: string }[];
}
