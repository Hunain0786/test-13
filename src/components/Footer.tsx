import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-[#6b5f50]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-[#1e1e1e]">
          <div>
            <h3 className="font-playwrite text-[#e8dcc8] text-sm mb-4" style={{ fontWeight: 200 }}>AKR</h3>
            <p className="text-xs leading-relaxed tracking-wide font-cormorant text-[#7a6e60] text-base">
              Crafting rare and distinguished fragrances for those who appreciate the extraordinary. Each bottle holds a story, each scent a memory.
            </p>
          </div>

          <div>
            <h4 className="text-[#a89880] text-xs tracking-[0.2em] uppercase mb-5 font-light">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'Shop', page: 'shop' as Page },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className="text-xs tracking-wider text-[#6b5f50] hover:text-[#e8dcc8] transition-colors duration-300 uppercase font-light"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#a89880] text-xs tracking-[0.2em] uppercase mb-5 font-light">Follow Us</h4>
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 border border-[#1e1e1e] flex items-center justify-center text-[#6b5f50] hover:text-[#e8dcc8] hover:border-[#e8dcc8] transition-all duration-300"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <p className="text-xs tracking-wider text-[#4a4035] mt-5 font-light">contact@akrfragrance.com</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-widest text-[#3a3028] uppercase font-light">
            &copy; {new Date().getFullYear()} AKR Premium Fragrance. All rights reserved.
          </p>
          <p className="font-playwrite text-[#2a2018] text-xs" style={{ fontWeight: 100 }}>
            The art of scent
          </p>
        </div>
      </div>
    </footer>
  );
}
