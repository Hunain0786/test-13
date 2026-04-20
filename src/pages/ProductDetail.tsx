import { useState, useMemo } from 'react';
import { ArrowLeft, Star, ShoppingBag, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Page } from '../types';
import { LOCAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

// ── Static mock reviews per product ──────────────────────────────────────────
const REVIEWS: Record<string, { name: string; rating: number; date: string; body: string }[]> = {
  '1': [
    { name: 'Arisha K.', rating: 5, date: 'March 2026', body: "Absolutely divine. The floral opening is incredibly fresh and the dry-down leaves this soft, powdery finish that lasts all day. I've received so many compliments." },
    { name: 'Rida M.', rating: 5, date: 'February 2026', body: 'Smells exactly like the original Gucci Flora but so much more affordable. The attar concentration means a little goes a long way. Highly recommend.' },
    { name: 'Hamza T.', rating: 4, date: 'January 2026', body: "Great scent for everyday wear. Slightly sweet but not overwhelming. Longevity is impressive for an attar." },
  ],
  '2': [
    { name: 'Faisal A.', rating: 5, date: 'March 2026', body: "This is pure sophistication in a bottle. The oud note is not harsh at all — it's warm, smooth, and incredibly masculine. My go-to evening fragrance." },
    { name: 'Sara N.', rating: 4, date: 'February 2026', body: "I bought this for my husband and he hasn't stopped wearing it since. The woody amber trail is sensational." },
    { name: 'Omar B.', rating: 5, date: 'January 2026', body: 'A true powerhouse. Projects beautifully and the longevity is exceptional. Worth every rupee.' },
  ],
  '3': [
    { name: 'Maryam J.', rating: 5, date: 'March 2026', body: "Red Cristal is my signature scent. It's sweet without being cloying, and the amber heart makes it perfect for evenings. I always get asked what I'm wearing." },
    { name: 'Zoya F.', rating: 5, date: 'February 2026', body: "Everything about this perfume is premium — the scent, the longevity, the sillage. Truly luxurious." },
    { name: 'Ibrahim S.', rating: 4, date: 'January 2026', body: 'Gifted this to my wife and she absolutely loves it. The floral notes are elegant and the amber base is warm and long-lasting.' },
  ],
  '4': [
    { name: 'Nida R.', rating: 5, date: 'March 2026', body: "The Luxe version is next level. Richer, deeper, more complex than the original. This is an evening scent that commands attention the moment you walk into a room." },
    { name: 'Ahmed K.', rating: 5, date: 'February 2026', body: "If you loved Red Cristal, the Luxe takes it up several notches. The oud base adds incredible depth. A masterpiece." },
    { name: 'Fatima Q.', rating: 4, date: 'January 2026', body: 'Strong projection and excellent longevity. The oud note is prominent but beautifully balanced with the florals. Stunning.' },
  ],
  '5': [
    { name: 'Layla H.', rating: 5, date: 'March 2026', body: 'AL Sabaya is delicate, feminine, and incredibly classy. The rose note is authentic and the musky base makes it linger beautifully on skin.' },
    { name: 'Sana U.', rating: 5, date: 'February 2026', body: "My favourite floral attar without question. It's elegant, not heavy, and lasts surprisingly well. Perfect for daytime wear." },
    { name: 'Bilal M.', rating: 4, date: 'December 2025', body: 'Gifted to my mother and she loves it. The Rose is true and natural-smelling. Very pleasant and feminine.' },
  ],
};

// ── Ingredients/notes detail per product ─────────────────────────────────────
const NOTE_DETAILS: Record<string, { top: string[]; heart: string[]; base: string[] }> = {
  '1': { top: ['Citrus Burst', 'Peach Blossom', 'Rose'],   heart: ['Magnolia', 'Jasmine', 'Peony'],  base: ['Musk', 'Sandalwood', 'White Cedar'] },
  '2': { top: ['Bergamot', 'Black Pepper'],                  heart: ['Oud', 'Leather', 'Vetiver'],     base: ['Amber', 'Sandalwood', 'Patchouli'] },
  '3': { top: ['Red Berries', 'Citrus Zest'],               heart: ['Rose', 'Iris', 'Jasmine'],       base: ['Amber', 'Musk', 'Vanilla'] },
  '4': { top: ['Saffron', 'Red Berries', 'Citrus'],         heart: ['Rose', 'Iris', 'Jasmine', 'Oud'], base: ['Dark Amber', 'Sandalwood', 'Vanilla', 'Musk'] },
  '5': { top: ['Rose Petals', 'Peach', 'Bergamot'],         heart: ['Rose Absolute', 'Jasmine', 'Lily'], base: ['Musk', 'Amber', 'White Woods'] },
};

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: Page) => void;
  onProductClick: (productId: string) => void;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          strokeWidth={1.5}
          className={n <= rating ? 'text-[#c9a96e] fill-[#c9a96e]' : 'text-[#3a342d]'}
        />
      ))}
    </div>
  );
}

export default function ProductDetail({ productId, onNavigate, onProductClick }: ProductDetailProps) {
  const product = useMemo(() => LOCAL_PRODUCTS.find((p) => p.id === productId), [productId]);
  const [qty, setQty] = useState(1);
  const [expandDesc, setExpandDesc] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'reviews'>('ingredients');

  const reviews = REVIEWS[productId] ?? [];
  const notes = NOTE_DETAILS[productId];
  const avgRating = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
    : 5;

  const related = useMemo(
    () => LOCAL_PRODUCTS.filter((p) => p.id !== productId).slice(0, 4),
    [productId],
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] pt-20">
        <p className="font-cormorant text-2xl text-[#9a8c7e] font-light">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f7f4] min-h-screen pt-20">

      {/* ── BREADCRUMB ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-[#9a8c7e] hover:text-[#0a0a0a] transition-colors duration-200 text-[10px] tracking-[0.25em] uppercase font-light"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          Back to Shop
        </button>
      </div>

      {/* ── HERO: IMAGE + BUY PANEL ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Image */}
          <div className="relative bg-[#ede9e2] aspect-[4/5] overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Category badge */}
            <div className="absolute top-5 left-5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#e8dcc8] px-3 py-1.5 font-light">
                {product.category}
              </span>
            </div>
            {!product.in_stock && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/40">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#e8dcc8] border border-[#e8dcc8]/60 px-6 py-3 font-light">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Buy Panel */}
          <div className="md:pt-4 md:sticky md:top-24">
            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRow rating={avgRating} />
              <span className="text-[10px] tracking-[0.2em] text-[#9a8c7e] font-light uppercase">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-cormorant text-[#0a0a0a] font-light italic leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              {product.name}
            </h1>

            {/* Short desc */}
            <p className="text-[#7a6e60] text-sm font-light tracking-wide leading-relaxed mb-5">
              {product.short_description}
            </p>

            {/* Divider */}
            <div className="w-10 h-px bg-[#c9a96e]/50 mb-6" />

            {/* Price */}
            <p className="font-cormorant text-4xl text-[#0a0a0a] font-light mb-1">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#9a8c7e] font-light mb-8">
              {product.size_ml}ml · Free delivery on orders above ₹999
            </p>

            {/* Notes chips */}
            <div className="mb-8">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#9a8c7e] mb-3 font-light">Fragrance Notes</p>
              <div className="flex flex-wrap gap-2">
                {product.notes.split(',').map((note) => (
                  <span
                    key={note.trim()}
                    className="text-[10px] tracking-[0.15em] uppercase text-[#6b5f50] border border-[#d4c5a9] bg-white px-3 py-1.5 font-light"
                  >
                    {note.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#9a8c7e] mb-3 font-light">Quantity</p>
              <div className="inline-flex items-center border border-[#d4c5a9] bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6b5f50] hover:text-[#0a0a0a] hover:bg-[#f5f0e8] transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} strokeWidth={1.5} />
                </button>
                <span className="w-12 text-center text-sm font-light text-[#0a0a0a] tracking-widest select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#6b5f50] hover:text-[#0a0a0a] hover:bg-[#f5f0e8] transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={!product.in_stock}
                className="flex-1 flex items-center justify-center gap-3 bg-[#0a0a0a] text-[#e8dcc8] py-4 text-[10px] tracking-[0.3em] uppercase font-light hover:bg-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                {product.in_stock ? 'Add to Bag' : 'Out of Stock'}
              </button>
              <button
                disabled={!product.in_stock}
                className="flex-1 py-4 text-[10px] tracking-[0.3em] uppercase font-light border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e8dcc8] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 pt-6 border-t border-[#e8dcc8] grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Authentic', sub: '100% genuine' },
                { label: 'Secure', sub: 'Safe checkout' },
                { label: 'Returns', sub: '7-day policy' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] font-light mb-0.5">{label}</p>
                  <p className="text-[9px] text-[#9a8c7e] tracking-wider font-light">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL DESCRIPTION ── */}
      <section className="bg-white border-y border-[#e8dcc8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="max-w-2xl">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-3 font-light">About</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-[#0a0a0a] font-light italic mb-6">
              The Story of {product.name}
            </h2>
            <p className="text-[#4a4035] text-sm font-light leading-loose tracking-wide">
              {product.description}
            </p>
            <div className={`overflow-hidden transition-all duration-500 ${expandDesc ? 'max-h-96 mt-4' : 'max-h-0'}`}>
              <p className="text-[#4a4035] text-sm font-light leading-loose tracking-wide">
                Each bottle is carefully crafted and filled by our master perfumers using only the finest raw materials
                sourced from around the world. The result is a fragrance of extraordinary depth and character that
                evolves beautifully on the skin over time. From the sparkling top notes to the warm, lingering base,
                every facet of {product.name} has been thoughtfully composed to create an unforgettable olfactive experience.
              </p>
            </div>
            <button
              onClick={() => setExpandDesc((v) => !v)}
              className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9a8c7e] hover:text-[#0a0a0a] transition-colors duration-200 font-light"
            >
              {expandDesc ? 'Read less' : 'Read more'}
              {expandDesc ? <ChevronUp size={13} strokeWidth={1.5} /> : <ChevronDown size={13} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </section>

      {/* ── TABS: INGREDIENTS & REVIEWS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {/* Tab bar */}
        <div className="flex border-b border-[#e8dcc8] mb-12">
          {(['ingredients', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 mr-10 text-[10px] tracking-[0.3em] uppercase font-light transition-all duration-200 ${
                activeTab === tab
                  ? 'text-[#0a0a0a] border-b-2 border-[#c9a96e] -mb-px'
                  : 'text-[#9a8c7e] hover:text-[#6b5f50]'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Ingredients & Notes'}
            </button>
          ))}
        </div>

        {/* ── INGREDIENTS ── */}
        {activeTab === 'ingredients' && notes && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(
              [
                { label: 'Top Notes', desc: 'First impression — what you smell immediately', items: notes.top, color: '#f5f0e8' },
                { label: 'Heart Notes', desc: 'The soul of the fragrance — emerges after 15–30 min', items: notes.heart, color: '#ede9e2' },
                { label: 'Base Notes', desc: 'The lasting impression — deepens over hours', items: notes.base, color: '#e8e0d4' },
              ] as const
            ).map(({ label, desc, items, color }) => (
              <div key={label} className="border border-[#e8dcc8] p-8" style={{ backgroundColor: color }}>
                <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-2 font-light">{label}</p>
                <p className="text-[10px] text-[#9a8c7e] font-light tracking-wide mb-6 leading-relaxed">{desc}</p>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] shrink-0" />
                      <span className="font-cormorant text-[#0a0a0a] text-base font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── REVIEWS ── */}
        {activeTab === 'reviews' && (
          <div>
            {/* Rating summary */}
            <div className="flex items-center gap-6 mb-12 pb-10 border-b border-[#e8dcc8]">
              <div className="text-center">
                <p className="font-cormorant text-6xl text-[#0a0a0a] font-light leading-none mb-2">{avgRating}.0</p>
                <StarRow rating={avgRating} />
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#9a8c7e] mt-2 font-light">{reviews.length} reviews</p>
              </div>
              <div className="flex-1 border-l border-[#e8dcc8] pl-8 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-[10px] text-[#9a8c7e] font-light w-3">{star}</span>
                      <div className="flex-1 h-1 bg-[#e8dcc8] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c9a96e] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-[#9a8c7e] font-light w-4">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual reviews */}
            <div className="space-y-10">
              {reviews.map((review, i) => (
                <div key={i} className="border-b border-[#e8dcc8] pb-10 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-sm font-light text-[#0a0a0a] tracking-wide">{review.name}</p>
                      <p className="text-[10px] text-[#9a8c7e] tracking-wider font-light mt-0.5">{review.date}</p>
                    </div>
                    <StarRow rating={review.rating} />
                  </div>
                  <p className="text-sm text-[#4a4035] font-light leading-loose tracking-wide">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section className="bg-[#0a0a0a] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#6b5f50] mb-2 font-light">Explore More</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-[#e8dcc8] font-light italic">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {related.map((p) => (
              <div key={p.id} className="bg-[#0a0a0a]">
                {/* Invert card colours for dark bg */}
                <div
                  className="group cursor-pointer"
                  onClick={() => onProductClick(p.id)}
                >
                  <div className="relative overflow-hidden bg-[#1a1a1a] aspect-[3/4]">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#e8dcc8] bg-[#0a0a0a]/70 px-2 py-1 font-light">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 pb-2">
                    <h3 className="font-cormorant text-[#c4b49a] text-base font-light leading-tight group-hover:text-[#e8dcc8] transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="font-cormorant text-[#6b5f50] text-sm font-light mt-1">
                      ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
