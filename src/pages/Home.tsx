import { ArrowRight, Star } from 'lucide-react';
import { Page } from '../types';
import ProductCard from '../components/ProductCard';
import { FEATURED_PRODUCTS } from '../data/products';

interface HomeProps {
    onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
    return (
        <div className="bg-[#f9f7f4]">
            <section className="relative h-screen flex items-end overflow-hidden bg-[#0a0a0a]">
                {/* Background image — slightly brighter so the bottle is more visible */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url(https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1600)',
                        opacity: 0.55,
                    }}
                />

                {/* Left-to-right vignette — keeps left panel dark for legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/50 to-transparent" />

                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />

                {/* ── TEXT BLOCK — anchored bottom-left ── */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 lg:px-20 pb-16 md:pb-24">
                    <div className="flex items-flex-start gap-6 max-w-xl">
                        {/* Decorative vertical rule */}
                        <div className="hidden md:flex flex-col items-center gap-0 pt-1 shrink-0">
                            <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#c9a96e] to-[#c9a96e]/30" />
                        </div>

                        <div>
                            <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e] mb-4 font-light">
                                Est. 2024
                            </p>

                            <h1
                                className="font-playwrite text-[#e8dcc8] mb-3 leading-none"
                                style={{ fontWeight: 200, fontSize: 'clamp(3rem, 7vw, 6rem)' }}
                            >
                                AKR
                            </h1>

                            <p className="font-cormorant text-[#d4c4aa] text-2xl md:text-3xl lg:text-4xl font-light italic mb-3 leading-snug">
                                Premium Fragrance
                            </p>

                            {/* Thin divider */}
                            <div className="w-10 h-px bg-[#c9a96e]/50 mb-4" />

                            <p className="text-[#8a7e70] text-[10px] md:text-xs font-light tracking-[0.35em] uppercase mb-8">
                                The art of extraordinary scent
                            </p>

                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <button
                                    onClick={() => onNavigate('shop')}
                                    className="group flex items-center gap-3 bg-[#e8dcc8] text-[#0a0a0a] px-8 py-3.5 text-[10px] tracking-[0.28em] uppercase font-light hover:bg-white transition-all duration-300"
                                >
                                    Explore Collection
                                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                                <button
                                    onClick={() =>
                                        document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="flex items-center gap-3 text-[#a89880] border border-[#3a3028] px-8 py-3.5 text-[10px] tracking-[0.28em] uppercase font-light hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
                                >
                                    Featured Scents
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator — right side, vertical */}
                <div className="absolute right-8 md:right-12 bottom-10 flex flex-col items-center gap-3 z-10">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#4a4035] rotate-90 mb-2" style={{ writingMode: 'vertical-rl' }}>
                        Scroll
                    </p>
                    <div className="w-px h-12 bg-gradient-to-b from-[#4a4035] to-transparent animate-pulse" />
                </div>
            </section>

            {/* ── PILLARS ──────────────────────────────────────────── */}
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

            {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
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
                            <ProductCard key={product.id} product={product} />
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

            {/* ── PHILOSOPHY ───────────────────────────────────────── */}
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

            {/* ── NEWSLETTER ───────────────────────────────────────── */}
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
