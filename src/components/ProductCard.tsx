import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-[#ede9e2] aspect-[3/4]">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#e8dcc8] px-2 py-1 font-light">
            {product.category}
          </span>
        </div>
        {!product.in_stock && (
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8] bg-[#0a0a0a] px-3 py-1.5 font-light">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-cormorant text-lg font-light text-[#0a0a0a] leading-tight group-hover:text-[#6b5f50] transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-[11px] tracking-wider text-[#9a8c7e] mt-0.5 font-light uppercase">
              {product.size_ml}ml
            </p>
          </div>
          <span className="font-cormorant text-base text-[#0a0a0a] font-light whitespace-nowrap mt-0.5">
            ${product.price.toFixed(0)}
          </span>
        </div>
        <p className="text-[11px] text-[#9a8c7e] mt-2 font-light tracking-wide leading-relaxed line-clamp-1">
          {product.short_description}
        </p>
        <p className="text-[10px] text-[#b5a898] mt-1.5 font-light tracking-wide leading-relaxed line-clamp-2">
          {product.notes}
        </p>
      </div>
    </div>
  );
}
