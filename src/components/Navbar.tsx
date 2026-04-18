import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPage === 'home';
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-[#0a0a0a] shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => handleNav('home')}
            className="font-playwrite text-base md:text-lg font-light tracking-widest text-[#e8dcc8] hover:text-white transition-colors duration-300"
            style={{ fontWeight: 200 }}
          >
            AKR
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 font-light ${
                  currentPage === page
                    ? 'text-[#e8dcc8] border-b border-[#e8dcc8] pb-0.5'
                    : 'text-[#a89880] hover:text-[#e8dcc8]'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('shop')}
              className="text-[#a89880] hover:text-[#e8dcc8] transition-colors duration-300"
              aria-label="Shop"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>

            <button
              className="md:hidden text-[#a89880] hover:text-[#e8dcc8] transition-colors duration-300 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-[#0a0a0a] border-t border-[#1e1e1e] transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`text-left text-xs tracking-[0.2em] uppercase py-3 transition-all duration-300 font-light border-b border-[#1e1e1e] last:border-0 ${
                currentPage === page
                  ? 'text-[#e8dcc8]'
                  : 'text-[#6b5f50] hover:text-[#e8dcc8]'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
