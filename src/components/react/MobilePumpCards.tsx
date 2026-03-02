import shibauraLogoMark from '@assets/shibaura-logo-mark.svg?url';

interface Capability {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: { src: string };
  features: { label: string; icon: string }[];
}

interface Props {
  capabilities: Capability[];
  detailsBaseHref?: string;
  locale?: 'en' | 'fr';
}

export default function MobilePumpCards({ capabilities, detailsBaseHref = '/en/products', locale = 'en' }: Props) {
  const isFrench = locale === 'fr';
  return (
    <div className="space-y-4">
      {capabilities.map((capability, index) => (
        <article
          key={index}
          className="mx-px border border-slate-200/70 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="px-6 py-5">
            <div className="flex items-center space-x-4">
              <div className="flex-1 pr-2">
                <h3 className="flex items-center gap-2 text-xl font-bold text-[var(--brand-1)]">
                  <span
                    aria-hidden="true"
                    className="w-7 h-7 shrink-0 brand-gradient-bg"
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
                  <span>{capability.title}</span>
                </h3>
                <h4 className="text-sm font-semibold text-slate-700 mt-1">
                  {capability.subtitle}
                </h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  {capability.description}
                </p>
                <div className="mt-4 overflow-hidden bg-gradient-to-b from-white to-slate-50/30">
                  <img
                    src={capability.image.src}
                    alt={capability.title}
                    className="h-56 w-full object-contain bg-white"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-50/60 -mx-6 px-6 pt-3 pb-0">
              <ul className="space-y-1">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="flex items-center justify-center shrink-0 w-4 h-4">
                      <img
                        src={feature.icon}
                        alt=""
                        className="block object-contain w-4 h-4 opacity-80"
                        aria-hidden="true"
                      />
                    </div>
                    <span className={`text-sm text-slate-700 leading-snug whitespace-pre-line ${idx === 0 ? 'font-semibold' : ''}`}>
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mx-6 px-6 pt-4 pb-0 flex justify-center bg-white">
              <a
                href={`${detailsBaseHref}/${capability.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[var(--brand-1)] transition-colors group"
              >
                {isFrench ? 'Voir les détails' : 'View Details'}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
