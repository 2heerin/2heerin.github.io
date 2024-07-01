// Cart.js

import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css'; 
import CartTop from '../assets/CartTop.png'; // 예시 경로, 실제 경로에 따라 수정하세요.
import CartBottom from '../assets/CartBottom.png'; // 예시 경로, 실제 경로에 따라 수정하세요.
import ProductCard from './ProductCard';
import style_des from "../description.module.css";
const Cart = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    if (cartItem) {
      setProduct(cartItem.selected);
    }
  }, []);

  if (!product) {
    return <p>장바구니에 담긴 상품이 없습니다.</p>;
  }

  return (
    <div style={{flex: 1}}>
      <img src={CartTop} alt="Cart Top" width={1100} />
      <div className={styles.productDetailContainer}>
      <div>
      </div>

      <div className={styles.delivery_enterprise_wrapper} style={{flexDirection: "row" , padding: 30, fontSize: 24}} >
      <img src={product.imageUrl} alt={product.name} width={392} height={392} style={{alignContent:"flex-start"}} />
        <div className='wrap' style={{flexDirection: "column"}}>
          <ProductCard 
              id={product.id} 
              productName={product.name} 
              productPrice={product.price} 
            />
        <div>
        <p>5초 후 다음 버튼을 클릭하세요.</p>
        <button
          onClick={() => {
            setTimeout(() => {
              alert('이제 다음 버튼을 클릭할 수 있습니다.');
              // 다음 광고 페이지로 이동
            }, 5000);
          }}
        >
          다음
        </button>
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

export default Cart;
