import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { LOCAL_PRODUCTS } from '../data/products';

const CATEGORIES = ['All', 'Attar', 'Perfume'];
const SIZES = ['All', '12ml', '100ml'];
const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Name A–Z', value: 'name_asc' },
];

export default function Shop() {
    const [category, setCategory] = useState('All');
    const [size, setSize] = useState('All');
    const [sort, setSort] = useState('featured');
    const [filterOpen, setFilterOpen] = useState(false);

    const products: Product[] = useMemo(() => {
        let list = [...LOCAL_PRODUCTS];

        if (category !== 'All') list = list.filter((p) => p.category === category);
        if (size !== 'All') list = list.filter((p) => `${p.size_ml}ml` === size);

        if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
        else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
        else if (sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name));
        else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

        return list;
    }, [category, size, sort]);

    const activeFiltersCount = (category !== 'All' ? 1 : 0) + (size !== 'All' ? 1 : 0);

    return (
        <div className="bg-[#f9f7f4] min-h-screen pt-20">
            <div className="bg-[#0a0a0a] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#6b5f50] mb-3 font-light">Discover</p>
                    <h1 className="font-cormorant text-4xl md:text-6xl text-[#e8dcc8] font-light leading-tight">
                        Our Collection
                    </h1>
                    <div className="w-10 h-px bg-[#c9a96e] mt-5" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="hidden md:flex items-center gap-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                                        category === cat
                                            ? 'bg-[#0a0a0a] text-[#e8dcc8]'
                                            : 'text-[#7a6e60] hover:text-[#0a0a0a] hover:bg-[#e8dcc8]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <button
                            className="md:hidden flex items-center gap-2 border border-[#d4c5a9] px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-[#7a6e60] font-light hover:border-[#0a0a0a] transition-colors duration-300"
                            onClick={() => setFilterOpen(!filterOpen)}
                        >
                            <SlidersHorizontal size={12} />
                            Filter
                            {activeFiltersCount > 0 && (
                                <span className="bg-[#0a0a0a] text-[#e8dcc8] text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={() => { setCategory('All'); setSize('All'); }}
                                className="flex items-center gap-1.5 text-[10px] tracking-wider text-[#9a8c7e] hover:text-[#0a0a0a] transition-colors duration-300 uppercase font-light"
                            >
                                <X size={11} />
                                Clear
                            </button>
                        )}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-transparent border border-[#d4c5a9] text-[10px] tracking-[0.15em] uppercase text-[#7a6e60] px-3 py-2 outline-none focus:border-[#0a0a0a] transition-colors duration-300 font-light cursor-pointer"
                        >
                            {SORT_OPTIONS.map(({ label, value }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {filterOpen && (
                    <div className="md:hidden bg-white border border-[#e8dcc8] p-5 mb-6 space-y-5">
                        <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#9a8c7e] mb-3 font-light">Category</p>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                                            category === cat
                                                ? 'bg-[#0a0a0a] text-[#e8dcc8]'
                                                : 'border border-[#d4c5a9] text-[#7a6e60]'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#9a8c7e] mb-3 font-light">Size</p>
                            <div className="flex flex-wrap gap-2">
                                {SIZES.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                                            size === s
                                                ? 'bg-[#0a0a0a] text-[#e8dcc8]'
                                                : 'border border-[#d4c5a9] text-[#7a6e60]'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="hidden md:flex items-center gap-2 mb-8">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#9a8c7e] font-light mr-2">Size:</p>
                    {SIZES.map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                                size === s
                                    ? 'bg-[#0a0a0a] text-[#e8dcc8]'
                                    : 'border border-[#d4c5a9] text-[#7a6e60] hover:border-[#0a0a0a]'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-8">
                    <p className="text-[11px] tracking-widest text-[#9a8c7e] font-light uppercase">
                        {`${products.length} ${products.length === 1 ? 'fragrance' : 'fragrances'}`}
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="font-cormorant text-2xl text-[#9a8c7e] font-light mb-2">No fragrances found</p>
                        <p className="text-xs text-[#b5a898] tracking-wider font-light">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
