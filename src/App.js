import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import style_des from './description.module.css';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Ad from './components/Ad';
import Adfirst from './components/Adfirst';
import Checkout from './components/Checkout';
import AdminPage from './components/AdminPage';
import Top from './assets/상단바.png';
import Delivery from './assets/배송.png';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [condition, setCondition] = useState('A');
  const [conditionad, setConditionad] = useState('1');
  const [products, setProducts] = useState([]);
  const [adData, setAdData] = useState({ imageUrl: '', adMessage: '' });

  const initialProducts = [
    { id: 1, name: 'Product 1', price: '17800', imageUrl: '//image.url/1.jpg' },
    { id: 2, name: 'Product 2', price: '2000', imageUrl: '//image.url/2.jpg' },
    // ... more products
  ];
  
  const initialAd = [
    { id: 1, imageUrl: '//image.url/ad1.jpg', adMessage: "광고 1입니다" },
    { id: 2, imageUrl: '//image.url/ad2.jpg', adMessage: "광고 2입니다" }
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

    const fetchAdData = () => {
      const savedAdData = JSON.parse(localStorage.getItem('adData'));
      if (savedAdData && Array.isArray(savedAdData) && savedAdData.length > 0) {
        setAdData(savedAdData);
      } else {
        localStorage.setItem('adData', JSON.stringify(initialAd));
        setAdData(initialAd);
      }
    };

    const fetchCondition = () => {
      const savedCondition = localStorage.getItem('condition');
      if (savedCondition) setCondition(savedCondition);
      else {
        localStorage.setItem('condition', 'A');
        setCondition('A');
      }
    };

    const fetchConditionad = () => {
      const savedConditionad = localStorage.getItem('conditionad');
      if (savedConditionad) setConditionad(savedConditionad);
      else {
        localStorage.setItem('conditionad', '1');
        setConditionad('1');
      }
    };

    fetchProducts();
    fetchAdData();
    fetchCondition();
    fetchConditionad();
  }, []);

  const handleProductClick = (productId) => {
    localStorage.setItem('selectedProductId', productId);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Routes>
          <Route path="/adfirst" element={<></>} />
          <Route path="/ad" element={<></>} />
          <Route path="/*" element={
            <Link to="/">
              <img 
                src={Top}
                width="1400" 
                height="160" 
                alt="상단바" 
                className={styles.logo} 
                style={{justifyContent:'center'}}
              />
            </Link>
          } />
        </Routes>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <aside className={styles.sidebarLeft}>
            <span>왼쪽 메뉴1</span>
          </aside>
          <section className={styles.centralMainArea}>
            <Routes>
              <Route path="/" element={
                <>
                  <img 
                    src={Delivery}
                    width="780"
                    height="40"
                    alt="배송"
                    className={styles.logo}
                  />
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
              } />
              <Route path="/product/:id" element={<ProductDetail condition={condition} products={products} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/ad" element={<Ad />} />
              <Route path="/adfirst" element={<Adfirst />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/adminpage" element={
                <AdminPage
                  setCondition={setCondition}
                  setConditionad={setConditionad}
                  setProducts={setProducts}
                  setAdData={setAdData}
                  initialProducts={initialProducts}
                  initialAd={initialAd}
                />
              } />
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
  );
}

export default App;
