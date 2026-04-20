import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ImageLightboxProps {
  products: Product[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  products,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const product = products[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < products.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handler);
    // Prevent body scroll while open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(6,5,4,0.96)' }}
      onClick={onClose}
    >
      {/* ── CLOSE ── */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 z-60 flex items-center gap-2 text-[#6b5f50] hover:text-[#e8dcc8] transition-colors duration-200"
        aria-label="Close"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-light hidden sm:inline">Close</span>
        <X size={20} strokeWidth={1} />
      </button>

      {/* ── COUNTER ── */}
      <div className="absolute top-5 left-6 z-60">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#4a4035] font-light">
          {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
        </p>
      </div>

      {/* ── INNER PANEL (stops click-outside propagation) ── */}
      <div
        className="relative flex flex-col md:flex-row items-center md:items-stretch gap-0 w-full h-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── LEFT ARROW ── */}
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#2e2820] text-[#6b5f50] hover:border-[#c9a96e] hover:text-[#c9a96e] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Previous"
        >
          <ChevronLeft size={18} strokeWidth={1.25} />
        </button>

        {/* ── IMAGE ── */}
        <div className="flex-1 flex items-center justify-center h-full min-h-0">
          <img
            key={product.id}
            src={product.image_url}
            alt={product.name}
            className="max-h-[65vh] md:max-h-full w-auto max-w-full object-contain"
            style={{
              animation: 'lbFadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>

        {/* ── DETAIL PANEL ── */}
        <div className="md:w-64 lg:w-72 shrink-0 flex flex-col justify-center md:pl-10 pt-5 md:pt-0 border-t border-[#1a1a1a] md:border-t-0 md:border-l md:border-[#1a1a1a]">
          {/* Category */}
          <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a96e] mb-3 font-light">
            {product.category}
          </p>

          {/* Name */}
          <h2
            className="font-cormorant text-[#e8dcc8] font-light italic leading-tight mb-2"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            {product.name}
          </h2>

          {/* Divider */}
          <div className="w-8 h-px bg-[#c9a96e]/40 mb-4" />

          {/* Description */}
          <p className="text-[#7a6e60] text-xs font-light leading-relaxed tracking-wide mb-5">
            {product.description}
          </p>

          {/* Notes */}
          <div className="mb-5">
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#4a4035] mb-2 font-light">
              Fragrance Notes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.notes.split(',').map((note) => (
                <span
                  key={note.trim()}
                  className="text-[10px] tracking-[0.2em] uppercase text-[#8a7e70] border border-[#2a2420] px-2.5 py-1 font-light"
                >
                  {note.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Size + Price */}
          <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#1a1a1a]">
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#4a4035] mb-1 font-light">
                Size
              </p>
              <p className="font-cormorant text-[#c4b49a] text-lg font-light">
                {product.size_ml} ml
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#4a4035] mb-1 font-light">
                Price
              </p>
              <p className="font-cormorant text-[#e8dcc8] text-2xl font-light">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Stock badge */}
          {!product.in_stock && (
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#6b5f50] mt-3 font-light">
              — Sold Out
            </p>
          )}
        </div>

        {/* ── RIGHT ARROW ── */}
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#2e2820] text-[#6b5f50] hover:border-[#c9a96e] hover:text-[#c9a96e] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Next"
        >
          <ChevronRight size={18} strokeWidth={1.25} />
        </button>
      </div>

      {/* Keyframe for image fade-in */}
      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
