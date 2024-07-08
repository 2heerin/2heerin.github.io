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
    { id: 1, name: '1.18리터 대용량 스텐 텀블러 + 빨대 포함 손잡이 이중 보온 보냉병 아이스 스트로 플로우 보틀 리유저블 핸들 보냉 보온병 캠핑 콜드컵 물병 워터 물통 빨대컵', 
    price: '17800', imageUrl: '//thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/f975/fcee351f7c061a43be3af1968381dc0df0529b6cdd2c1178ee7522d8816c.jpg' },
    { id: 2, name: '텀스 마운틴 진공 스텐 텀블러', 
    price: '2000', imageUrl: '//thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/09/21/14/6/bf0858eb-cc05-4b28-8987-8fe16b7435e9.jpg' },
    { id: 3, name: '뉴리스 진공 스테인리스 텀블러 900ml + 손잡이 + 뚜껑 + 스텐 빨대 + 빨대 세척솔 세트', 
    price: '12000', imageUrl: '//thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/05/23/12/6/920b39f0-e1f8-4892-b156-477513f93920.jpg' },
    { id: 4, name: '파밀리아레 진공 차량용 대용량 스텐 손잡이 텀블러 890ml + 빨대솔 + 세척솔 + 빨대', 
    price: '21000', imageUrl: '//thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/79c3/8d7e8fc609e3605fd877c60418618c726c3cdd79f94e1c19ba2873e0e7b8.jpg' },
    { id: 5, name: '캐리보틀 폴라 보온병 텀블러, 블랙. 970ml', 
    price: '27700', imageUrl: '//thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/4354176984576808-32cff0de-76aa-4e94-975e-08ce680cd659.jpg' },
    { id: 6, name: '쉐이크스피어 오리지널 뷰 프로틴쉐이커 쉐이크통 700ml', price: '32900', imageUrl: '//thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/78c3/2c0963e67e7565b6720d34146b4718bfdcaeb7575e15c88e89477c778267.jpg' }
  ];
  
  const initialAd = [
    { id: 1,
      imageUrl: '//thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/05/23/12/6/920b39f0-e1f8-4892-b156-477513f93920.jpg',
      adMessage: "광고 1입니다"
    },
    { id:2,
      imageUrl: '//thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/09/22/11/3/7edf2955-61bd-4adc-bcc1-7a3851a26cf9.jpg',
      adMessage: "광고 2입니다"
    }
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
