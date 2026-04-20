import { useState } from 'react';
import { ArrowLeft, Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Page } from '../types';
import { useCart } from '../context/CartContext';
import { LOCAL_PRODUCTS } from '../data/products';

interface CartProps {
  onNavigate: (page: Page) => void;
  onProductClick: (productId: string) => void;
}

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;

export default function Cart({ onNavigate, onProductClick }: CartProps) {
  const { items, removeFromCart, updateQty, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = items.map((item) => ({
    item,
    product: LOCAL_PRODUCTS.find((p) => p.id === item.productId)!,
  })).filter((x) => x.product);

  const subtotal = cartProducts.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0,
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal - discount + shipping;

  const handlePromo = () => {
    if (promoInput.trim().toUpperCase() === 'AKR10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  // ── Order placed confirmation ──
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f9f7f4] pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border border-[#c9a96e] flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={24} strokeWidth={1} className="text-[#c9a96e]" />
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] mb-3 font-light">Order Confirmed</p>
          <h1 className="font-cormorant text-4xl text-[#0a0a0a] font-light italic mb-4">
            Thank You
          </h1>
          <p className="text-sm text-[#7a6e60] font-light leading-loose tracking-wide mb-10">
            Your order has been received. We&apos;ll send you a confirmation shortly and dispatch your fragrances within 1–2 business days.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="group inline-flex items-center gap-3 bg-[#0a0a0a] text-[#e8dcc8] px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-light hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Continue Shopping
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f7f4] pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 border border-[#d4c5a9] flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={22} strokeWidth={1} className="text-[#9a8c7e]" />
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#9a8c7e] mb-3 font-light">Your Bag</p>
          <h1 className="font-cormorant text-4xl text-[#0a0a0a] font-light italic mb-4">
            Your bag is empty
          </h1>
          <p className="text-sm text-[#7a6e60] font-light leading-loose tracking-wide mb-10">
            Discover our collection of handcrafted fragrances and find your signature scent.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="group inline-flex items-center gap-3 bg-[#0a0a0a] text-[#e8dcc8] px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-light hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Explore Collection
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f7f4] min-h-screen pt-20">
      {/* ── Header ── */}
      <div className="bg-[#0a0a0a] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6b5f50] mb-2 font-light">Your Selection</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#e8dcc8] font-light leading-tight">
            Your Bag
          </h1>
          <div className="w-8 h-px bg-[#c9a96e] mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
        {/* Back link */}
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-[#9a8c7e] hover:text-[#0a0a0a] transition-colors duration-200 text-[10px] tracking-[0.25em] uppercase font-light mb-10"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          Continue Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          {/* ── LEFT: Cart Items ── */}
          <div>
            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-6 pb-4 border-b border-[#e8dcc8] mb-2">
              <div className="w-24" />
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#9a8c7e] font-light">Product</p>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#9a8c7e] font-light w-28 text-center">Quantity</p>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#9a8c7e] font-light w-20 text-right">Total</p>
            </div>

            <div className="divide-y divide-[#e8dcc8]">
              {cartProducts.map(({ item, product }) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[auto_1fr_auto_auto] gap-4 md:gap-6 py-7 items-start md:items-center"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-20 md:w-24 aspect-[3/4] bg-[#ede9e2] overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => onProductClick(product.id)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#9a8c7e] font-light">
                      {product.category}
                    </span>
                    <h3
                      className="font-cormorant text-xl text-[#0a0a0a] font-light italic leading-tight cursor-pointer hover:text-[#6b5f50] transition-colors duration-200"
                      onClick={() => onProductClick(product.id)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-[#9a8c7e] font-light tracking-wide">
                      {product.size_ml}ml · {product.notes}
                    </p>
                    <p className="font-cormorant text-base text-[#0a0a0a] font-light mt-1">
                      ₹{product.price.toLocaleString('en-IN')} each
                    </p>

                    {/* Mobile: qty + remove */}
                    <div className="flex items-center gap-4 mt-3 md:hidden">
                      <div className="inline-flex items-center border border-[#d4c5a9] bg-white">
                        <button
                          onClick={() => updateQty(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6b5f50] hover:text-[#0a0a0a] transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={11} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs font-light text-[#0a0a0a] select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6b5f50] hover:text-[#0a0a0a] transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={11} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-[#b5a898] hover:text-[#0a0a0a] transition-colors duration-200"
                        aria-label="Remove"
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Qty controls */}
                  <div className="hidden md:flex items-center w-28 justify-center">
                    <div className="inline-flex items-center border border-[#d4c5a9] bg-white">
                      <button
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                        className="w-8 h-9 flex items-center justify-center text-[#6b5f50] hover:text-[#0a0a0a] hover:bg-[#f5f0e8] transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={11} strokeWidth={1.5} />
                      </button>
                      <span className="w-9 text-center text-xs font-light text-[#0a0a0a] select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                        className="w-8 h-9 flex items-center justify-center text-[#6b5f50] hover:text-[#0a0a0a] hover:bg-[#f5f0e8] transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={11} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Line total + remove */}
                  <div className="hidden md:flex items-center justify-end gap-4 w-20">
                    <p className="font-cormorant text-lg text-[#0a0a0a] font-light whitespace-nowrap">
                      ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-[#b5a898] hover:text-[#0a0a0a] transition-colors duration-200 ml-2"
                      aria-label="Remove"
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white border border-[#e8dcc8] p-8">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#9a8c7e] mb-6 font-light">Order Summary</p>

              {/* Line items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#7a6e60] font-light tracking-wide">
                    Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''})
                  </span>
                  <span className="font-cormorant text-base text-[#0a0a0a] font-light">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between items-center text-[#c9a96e]">
                    <span className="text-xs font-light tracking-wide flex items-center gap-1.5">
                      <Tag size={11} strokeWidth={1.5} />
                      Promo AKR10 (10% off)
                    </span>
                    <span className="font-cormorant text-base font-light">
                      −₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#7a6e60] font-light tracking-wide">Shipping</span>
                  <span className="font-cormorant text-base text-[#0a0a0a] font-light">
                    {shipping === 0 ? (
                      <span className="text-[#6b5f50] text-sm font-light">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
              </div>

              {/* Free shipping progress */}
              {shipping > 0 && (
                <div className="mb-6 p-4 bg-[#f9f7f4] border border-[#e8dcc8]">
                  <p className="text-[10px] text-[#7a6e60] font-light tracking-wide mb-2">
                    Add ₹{(SHIPPING_THRESHOLD - (subtotal - discount)).toLocaleString('en-IN')} more for free shipping
                  </p>
                  <div className="w-full h-0.5 bg-[#e8dcc8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c9a96e] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(((subtotal - discount) / SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Divider + Total */}
              <div className="border-t border-[#e8dcc8] pt-5 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a] font-light">Total</span>
                  <span className="font-cormorant text-2xl text-[#0a0a0a] font-light">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[9px] text-[#9a8c7e] tracking-wider mt-1 font-light">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Promo code */}
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#9a8c7e] mb-3 font-light">Promo Code</p>
                <div className="flex gap-0">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoError(false); }}
                    placeholder="Enter code"
                    className="flex-1 border border-[#d4c5a9] border-r-0 px-4 py-2.5 text-xs tracking-wider text-[#0a0a0a] placeholder-[#b5a898] outline-none focus:border-[#0a0a0a] transition-colors font-light bg-white"
                  />
                  <button
                    onClick={handlePromo}
                    disabled={promoApplied}
                    className="border border-[#d4c5a9] bg-[#0a0a0a] text-[#e8dcc8] px-4 text-[9px] tracking-[0.2em] uppercase font-light hover:bg-[#1a1a1a] disabled:opacity-50 transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[10px] text-[#6b5f50] mt-1.5 font-light tracking-wide">✓ Code applied — 10% discount</p>
                )}
                {promoError && (
                  <p className="text-[10px] text-[#9a4030] mt-1.5 font-light tracking-wide">Invalid promo code. Try AKR10.</p>
                )}
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-3 bg-[#0a0a0a] text-[#e8dcc8] py-4 text-[10px] tracking-[0.3em] uppercase font-light hover:bg-[#1a1a1a] transition-colors duration-300 mb-3"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                Place Order
              </button>

              <p className="text-center text-[9px] text-[#b5a898] tracking-widest font-light">
                Secure checkout · Cash on Delivery available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
