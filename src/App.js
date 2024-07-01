// App.js
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import style_des from './description.module.css';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Ad from './components/Ad';
import Checkout from './components/Checkout';
import AdminPage from './components/AdminPage';
import Survey from './components/Survey';
import Top from './assets/상단바.png';
import Delivery from './assets/배송.png';
import CartImg from './assets/cart.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [condition, setCondition] = useState('A');
  const [products, setProducts] = useState([]);
  const [adData, setAdData] = useState({ imageUrl: '', adMessage: '' });
  const initialProducts = [
    { id: 1, name: '초기 상품 1', price: '1000', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/05/31/9/5/6eb652f5-8aaf-4c7a-aea8-c2ac9979f648.jpg' },
    { id: 2, name: '초기 상품 2', price: '2000', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/05/31/9/5/6eb652f5-8aaf-4c7a-aea8-c2ac9979f648.jpg' },
    { id: 3, name: '초기 상품 3', price: '3000', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/05/31/9/5/6eb652f5-8aaf-4c7a-aea8-c2ac9979f648.jpg' },
    { id: 4, name: '초기 상품 4', price: '4000', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/05/31/9/5/6eb652f5-8aaf-4c7a-aea8-c2ac9979f648.jpg' },
    { id: 5, name: '초기 상품 5', price: '5000', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/05/31/9/5/6eb652f5-8aaf-4c7a-aea8-c2ac9979f648.jpg' },
    { id: 6, name: '초기 상품 6', price: '6000', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/05/31/9/5/6eb652f5-8aaf-4c7a-aea8-c2ac9979f648.jpg' }
  ];

  useEffect(() => {
    const fetchProducts = () => {
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      if (savedProducts && Array.isArray(savedProducts) && savedProducts.length > 0) {
        setProducts(savedProducts);
      } else {
        localStorage.setItem('products', JSON.stringify(initialProducts));
        setProducts(initialProducts);
      }
    };

    fetchProducts();

    const savedCondition = localStorage.getItem('condition');
    const savedAdData = JSON.parse(localStorage.getItem('adData'));
    if (savedCondition) {
      setCondition(savedCondition);
    }
    if (savedAdData) {
      setAdData(savedAdData);
    }
  }, []);

  const handleProductClick = (productId) => {
    localStorage.setItem('selectedProductId', productId);
  };

  return (
    <Router>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link to="/">
            <img 
              src={Top}
              width="1000" 
              height="160" 
              alt="상단바" 
              className={styles.logo} 
            />
          </Link>
          <Link to="/cart">
            <img 
              src={CartImg}
              width="170" 
              height="160" 
              alt="장바구니" 
              className={styles.logo} 
            />
          </Link>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <aside className={styles.sidebarLeft}>
              <span>왼쪽 메뉴1</span>
            </aside>

            <section className={styles.centralMainArea}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <img 
                        src={Delivery}
                        width="780" 
                        height="40" 
                        alt="배송" 
                        className={styles.logo} 
                      />
                      <span></span>
                      <div className={styles.productGrid}>
                        {products.map((product, index) => (
                          <div key={index} className={styles.productCard}>
                            <Link to={`/product/${product.id}`}>
                              <img 
                                src={product.imageUrl} 
                                width="230" 
                                height="230" 
                                alt={product.name} 
                                className={styles.productImage} 
                              />
                              <div className={style_des.descriptions}>
                                <ProductCard 
                                  id={product.id} 
                                  productName={product.name} 
                                  productPrice={product.price} 
                                  onProductClick={handleProductClick} 
                                />
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  } 
                />
                <Route path="/product/:id" element={<ProductDetail condition={condition} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/ad" element={<Ad />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/adminpage" element={<AdminPage setCondition={setCondition} setProducts={setProducts} setAdData={setAdData} initialProducts={initialProducts} />} />
                <Route path="/survey" element={<Survey />} />
              </Routes>
            </section>

            <aside className={styles.sidebarRight}>
              <span>오른쪽 사이드바</span>
            </aside>
          </div>
        </main>

        <footer className={styles.footer}>
          <Link to="/adminpage">
            <span>관리자 페이지</span>
          </Link>  
        </footer>
      </div>
    </Router>
  );
}

export default App
