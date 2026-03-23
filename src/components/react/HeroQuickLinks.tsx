interface HeroQuickLinkItem {
  label: string;
  title: string;
  href?: string;
  showArrow?: boolean;
  links?: {
    label: string;
    href: string;
  }[];
}

interface Props {
  items: HeroQuickLinkItem[];
}

export default function HeroQuickLinks({ items }: Props) {
  return (
    <div className="mx-auto grid w-fit max-w-full grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:w-auto lg:grid-cols-3 lg:gap-2">
      {items.map((item, index) => {
        const isCenteredMobileItem = items.length === 3 && index === 2;
        const content = (
          <>
            <div className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/70 sm:text-left sm:text-xs">
              {item.label}
            </div>
            {item.href ? (
              <div className="mt-2 text-center text-base font-bold leading-tight text-white transition-colors duration-300 group-hover:text-red-300 sm:text-left sm:text-xl">
                <span className="inline-flex items-center justify-center gap-1.5 sm:justify-start">
                  <span>{item.title}</span>
                  {item.showArrow ? (
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  ) : null}
                </span>
              </div>
            ) : (
              <div className="mt-3 space-y-2 text-center sm:text-left">
                {item.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl bg-transparent px-0 py-1 text-sm font-semibold leading-snug text-white transition-colors duration-300 hover:text-red-300 sm:text-base"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </>
        );

        return (
          <div
            key={item.label}
            className={`animate-fadeInUp ${isCenteredMobileItem ? 'col-span-2 justify-self-center sm:col-span-1 sm:justify-self-auto' : 'w-[9.75rem] sm:w-auto'}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {item.href ? (
              <a
                href={item.href}
                className={`group block rounded-2xl bg-transparent px-0 py-2 transition-all duration-300 hover:-translate-y-0.5 sm:py-3 ${isCenteredMobileItem ? 'mx-auto w-fit' : ''}`}
              >
                {content}
              </a>
            ) : (
              <div className="group rounded-2xl bg-transparent px-0 py-2 transition-all duration-300 hover:-translate-y-0.5 sm:py-3">
                {content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
