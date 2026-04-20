import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.hash.replace('#', '');
    if (path === 'shop') setCurrentPage('shop');
    if (path === 'cart') setCurrentPage('cart');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.location.hash = 'product';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={navigate} onProductClick={openProduct} />}
        {currentPage === 'shop' && <Shop onNavigate={navigate} onProductClick={openProduct} />}
        {currentPage === 'product' && selectedProductId && (
          <ProductDetail productId={selectedProductId} onNavigate={navigate} onProductClick={openProduct} />
        )}
        {currentPage === 'cart' && (
          <Cart onNavigate={navigate} onProductClick={openProduct} />
        )}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
