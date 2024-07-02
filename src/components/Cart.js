import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css'; 
import CartTop from '../assets/CartTop.png'; // 예시 경로, 실제 경로에 따라 수정하세요.
import CartBottom from '../assets/CartBottom.png'; // 예시 경로, 실제 경로에 따라 수정하세요.
import ProductCard from './ProductCard';
import style_des from "../description.module.css";
import AdFirst from './Adfirst';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    if (cartItem) {
      setProduct(cartItem.selected);
      setTimeout(() => {
        alert('확인이 끝났으면 다음 버튼을 눌러주세요');
        // 다음 광고 페이지로 이동
      }, 1000);
    }
  }, []);

  if (!product) {
    return <p>장바구니에 담긴 상품이 없습니다.</p>;
  }
  const handleClick = () => {
      navigate('/adfist');
  };

  return (
    <div style={{ flex: 1 }}>
      <img src={CartTop} alt="Cart Top" width={1100} />
      <div className={styles.productDetailContainer}>
        <div className={styles.delivery_enterprise_wrapper} style={{ flexDirection: "row", padding: 30, fontSize: 24 }}>
          <img src={product.imageUrl} alt={product.name} width={392} height={392} style={{ alignContent: "flex-start" }} />
          <div className='wrap' style={{ flexDirection: "column" }}>
            <ProductCard
              id={product.id}
              productName={product.name}
              productPrice={product.price}
            />
            <div>
              <Link to="/adfirst">
                <button className={styles.btn1}
                    onClick = {handleClick}
                >다음</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h1>장바구니</h1>
      <div>
        <h2>{product.name}</h2>
        <p>{product.price} 원</p>
      </div>
      <img src={CartBottom} alt="Cart Bottom" width={1100} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/adfirst" element={<AdFirst />} />
      </Routes>
    </Router>
  );
};

export default Cart;
