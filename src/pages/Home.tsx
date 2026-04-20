import { ArrowRight, Star } from 'lucide-react';
import { Page } from '../types';
import ProductCard from '../components/ProductCard';
import { FEATURED_PRODUCTS } from '../data/products';

interface HomeProps {
    onNavigate: (page: Page) => void;
    onProductClick: (productId: string) => void;
}

export default function Home({ onNavigate, onProductClick }: HomeProps) {
    return (
        <div className="bg-[#f9f7f4]">
            <section className="relative h-screen flex items-end overflow-hidden bg-[#0a0a0a]">
                {/* Hero image — served from /public */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/hero-image.jpg)',
                        opacity: 0.6,
                    }}
                />

                {/* Mobile: dark full overlay so centered text is always readable */}
                <div className="absolute inset-0 bg-[#0a0a0a]/55 md:hidden" />

                {/* Desktop: directional left vignette */}
                <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/5" />

                {/* Shared top + bottom fades */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/50" />

                {/* ── TEXT BLOCK ────────────────────────────────────── */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-20 pb-20 md:pb-28">

                    {/* Mobile: centered | Desktop: left with gold rule */}
                    <div className="flex items-start gap-5 max-w-lg mx-auto md:mx-0">

                        {/* Gold vertical rule — desktop only */}
                        <div className="hidden md:block w-px self-stretch shrink-0 bg-gradient-to-b from-transparent via-[#c9a96e]/80 to-transparent" />

                        <div className="w-full text-center md:text-left mb-12">
                            {/* Eyebrow */}
                            <p className="text-[10px] tracking-[0.55em] uppercase text-[#c9a96e] mb-5 font-light">
                                Est. 2024 · Premium Attar & Perfumes
                            </p>

                            {/* Brand name */}
                            <h1
                                className="font-cormorant text-[#f2e8d4] leading-none mb-4"
                                style={{
                                    fontWeight: 200,
                                    fontSize: 'clamp(4rem, 9vw, 7rem)',
                                    textShadow: '0 4px 32px rgba(0,0,0,0.7)',
                                    letterSpacing: '0.05em',
                                    marginBottom: '-9px',
                                }}
                            >
                                AKR
                            </h1>

                            {/* Sub-tagline */}
                            <p
                                className="font-cormorant text-[#d4c4aa] font-light italic leading-snug mb-3"
                                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
                            >
                                Premium Fragrance
                            </p>

                            {/* Animated gold hairline */}
                            <div className="flex justify-center md:justify-start mb-5">
                                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent w-32 md:w-20" />
                            </div>

                            {/* Tagline */}
                            <p className="text-[#9a8c7e] text-[10px] md:text-[11px] font-light tracking-[0.5em] uppercase mb-10">
                                The art of extraordinary scent
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3">
                                <button
                                    onClick={() => onNavigate('shop')}
                                    className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#e8dcc8] text-[#0a0a0a] px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-light hover:bg-white transition-all duration-300"
                                >
                                    Explore Collection
                                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                                <button
                                    onClick={() =>
                                        document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="w-full sm:w-auto text-[#a89880] border border-[#3a3028] px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-light hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
                                >
                                    Featured Scents
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator — right side, hidden on mobile */}
                <div className="absolute right-8 md:right-12 bottom-10 hidden md:flex flex-col items-center gap-2 z-10">
                    <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a342d] font-light" style={{ writingMode: 'vertical-rl' }}>
                        Scroll
                    </p>
                    <div className="w-px h-10 bg-gradient-to-b from-[#4a4035] to-transparent animate-pulse mt-2" />
                </div>
            </section>

            {/* ── PILLARS ── */}
            <section className="py-12 md:py-20 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
                        {[
                            { label: 'Hand-selected ingredients', sub: 'Sourced from 40+ countries' },
                            { label: 'Master perfumers', sub: 'Over 3 decades of expertise' },
                            { label: 'Exclusive formulas', sub: 'Never mass-produced' },
                        ].map(({ label, sub }) => (
                            <div key={label} className="bg-[#0a0a0a] px-8 py-6 text-center">
                                <Star size={16} strokeWidth={1} className="text-[#c9a96e] mx-auto mb-2" />
                                <p className="font-cormorant text-[#e8dcc8] text-lg font-light mb-1">{label}</p>
                                <p className="text-[11px] tracking-wider text-[#4a4035] uppercase font-light">{sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED PRODUCTS ── */}
            <section id="featured-section" className="py-16 md:py-28 bg-[#f9f7f4]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12 md:mb-14">
                        <p className="text-[10px] tracking-[0.4em] uppercase text-[#9a8c7e] mb-3 font-light">
                            Curated Selection
                        </p>
                        <h2 className="font-cormorant text-4xl md:text-5xl text-[#0a0a0a] font-light mb-4 leading-tight">
                            Featured Collection
                        </h2>
                        <div className="w-12 h-px bg-[#c4b49a] mx-auto" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {FEATURED_PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onProductClick={onProductClick}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-12 md:mt-14">
                        <button
                            onClick={() => onNavigate('shop')}
                            className="group inline-flex items-center gap-3 border border-[#0a0a0a] text-[#0a0a0a] px-10 py-4 text-xs tracking-[0.25em] uppercase font-light hover:bg-[#0a0a0a] hover:text-[#e8dcc8] transition-all duration-300"
                        >
                            View All Fragrances
                            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── PHILOSOPHY ── */}
            <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
                <img
                    src="/WhatsApp_Image_2026-04-16_at_11.10.31_PM_(1).jpeg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-10"
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#6b5f50] mb-4 font-light">
                        Our Philosophy
                    </p>
                    <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-[#e8dcc8] font-light italic leading-tight mb-8">
                        "Scent is the most intimate form of memory"
                    </h2>
                    <p className="font-cormorant text-[#7a6e60] text-xl font-light leading-relaxed mb-10">
                        At AKR, we believe fragrance is not merely worn — it is lived. Each of our compositions is a dialogue between the finest raw materials and the souls who seek them.
                    </p>
                    <div className="w-8 h-px bg-[#c9a96e] mx-auto" />
                </div>
            </section>

            {/* ── NEWSLETTER ── */}
            <section className="py-20 md:py-28 bg-[#f5f0e8]">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#9a8c7e] mb-4 font-light">
                        Stay Connected
                    </p>
                    <h2 className="font-cormorant text-4xl md:text-5xl text-[#0a0a0a] font-light mb-4">
                        Join the Inner Circle
                    </h2>
                    <p className="text-sm text-[#7a6e60] font-light tracking-wide mb-10 max-w-lg mx-auto leading-relaxed">
                        Be the first to discover new collections, exclusive events, and the stories behind our rarest scents.
                    </p>
                    <form
                        className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 bg-white border border-[#d4c5a9] px-5 py-4 text-xs tracking-wider text-[#0a0a0a] placeholder-[#b5a898] outline-none focus:border-[#0a0a0a] transition-colors duration-300 font-light"
                        />
                        <button
                            type="submit"
                            className="bg-[#0a0a0a] text-[#e8dcc8] px-7 py-4 text-xs tracking-[0.2em] uppercase font-light hover:bg-[#1a1a1a] transition-colors duration-300 whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
