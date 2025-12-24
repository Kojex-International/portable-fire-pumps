import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
type NavItem = {
  name: string;
  href: string;
};

type MobileMenuProps = {
  items: NavItem[];
  rfqHref: string;
  enHref: string;
  frHref: string;
};

export default function MobileMenu({ items, rfqHref, enHref, frHref }: MobileMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
        <Dialog.Content className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 lg:hidden max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Main navigation menu</Dialog.Description>
          <div className="container mx-auto px-4 py-6 space-y-2">
            {items.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <a
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 active:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg transition-all"
                >
                  {item.name}
                </a>
              </Dialog.Close>
            ))}
            <div className="pt-5 flex items-center justify-center gap-4 text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-slate-600">
              <Dialog.Close asChild>
                <a href={enHref} className="px-2 py-1 rounded-md border border-transparent hover:text-[#E11D48] active:text-[#BE123C] active:bg-[#FFF1F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2 transition-colors">
                  EN
                </a>
              </Dialog.Close>
              <span className="text-slate-300 text-xl sm:text-2xl">/</span>
              <Dialog.Close asChild>
                <a href={frHref} className="px-2 py-1 rounded-md border border-transparent hover:text-[#E11D48] active:text-[#BE123C] active:bg-[#FFF1F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2 transition-colors">
                  FR
                </a>
              </Dialog.Close>
            </div>
            <div className="pt-4">
              <Dialog.Close asChild>
                <a
                  href={rfqHref}
                  className="block text-center px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg shadow-md transition-all"
                >
                  Request Quote
                </a>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
