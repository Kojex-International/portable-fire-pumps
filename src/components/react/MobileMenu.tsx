import * as Dialog from '@radix-ui/react-dialog';
import { Globe, Menu, X } from 'lucide-react';
type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
};

type MobileMenuProps = {
  items: NavItem[];
  rfqHref: string;
  enHref: string;
  frHref: string;
  locale: string;
};

export default function MobileMenu({ items, rfqHref, enHref, frHref, locale }: MobileMenuProps) {
  const isEnglish = locale === 'en' || locale === 'default';
  const isFrench = locale === 'fr';

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden p-2 text-slate-700 hover:bg-[var(--brand-1-10)] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
        <Dialog.Content className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 rounded-b-2xl z-50 lg:hidden max-h-[92vh] overflow-y-auto overscroll-contain">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Main navigation menu</Dialog.Description>
          <div className="container mx-auto px-4 py-6 pb-8 space-y-1 relative">
            <div className="absolute right-4 top-6 flex items-center justify-end">
              <div className="min-w-[98px] flex items-center justify-end space-x-2 text-sm font-semibold uppercase tracking-wide leading-none mr-3">
                <Globe className="w-4 h-4 text-slate-500 mr-1.5 shrink-0" />
                <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-100/80">
                  <Dialog.Close asChild>
                    <a
                      href={enHref}
                      aria-current={isEnglish ? 'page' : undefined}
                      className={`inline-flex min-h-8 items-center leading-none py-0.5 border-b-2 transition-colors ${isEnglish ? 'text-slate-900 border-[var(--brand-1)]' : 'text-slate-500 border-transparent hover:text-[var(--brand-1)]'}`}
                    >
                      EN
                    </a>
                  </Dialog.Close>
                  <span className="inline-flex h-8 items-center text-slate-300 text-sm leading-none">|</span>
                  <Dialog.Close asChild>
                    <a
                      href={frHref}
                      aria-current={isFrench ? 'page' : undefined}
                      className={`inline-flex min-h-8 items-center leading-none py-0.5 border-b-2 transition-colors ${isFrench ? 'text-slate-900 border-[var(--brand-1)]' : 'text-slate-500 border-transparent hover:text-[var(--brand-1)]'}`}
                    >
                      FR
                    </a>
                  </Dialog.Close>
                </div>
              </div>
              <Dialog.Close asChild>
                <button
                  className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>
            <div className="pr-[180px]">
              {items.map((item) => (
              <div key={item.href} className="space-y-0.5">
                <Dialog.Close asChild>
                  <a
                    href={item.href}
                  className="block px-4 py-2 text-lg font-medium text-slate-700 hover:text-slate-900 hover:bg-[var(--brand-1-10)] active:bg-[var(--brand-1-20)] active:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-1)] focus-visible:ring-offset-2 rounded-lg transition-all"
                  >
                    {item.name}
                  </a>
                </Dialog.Close>
                {item.children?.length ? (
                  <div className="ml-4 space-y-0.5">
                    {item.children.map((child) => (
                      <Dialog.Close asChild key={child.href}>
                        <a
                          href={child.href}
                          className="block whitespace-nowrap px-4 py-1 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-[var(--brand-1-10)] active:bg-[var(--brand-1-20)] active:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-1)] focus-visible:ring-offset-2 rounded-lg transition-all"
                        >
                          {child.name}
                        </a>
                      </Dialog.Close>
                    ))}
                  </div>
                ) : null}
              </div>
              ))}
            </div>
            <div className="pt-4">
              <Dialog.Close asChild>
                <a
                  href={rfqHref}
                  className="brand-cta w-full text-center px-6 py-3 text-sm focus-visible:outline-none"
                >
                  Contact
                </a>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
