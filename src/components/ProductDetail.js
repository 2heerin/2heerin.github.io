import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import style_des from "../description.module.css";
import ProductCard from './ProductCard';
const ProductDetail = ({ condition }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id를 가져옵니다.
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 이전 페이지에서 선택된 제품 ID를 localStorage에서 가져옵니다.
    const selectedProductId = localStorage.getItem('selectedProductId');
    const products = JSON.parse(localStorage.getItem('products'));

    if (selectedProductId && products) {
      const productData = products.find(product => product.id === parseInt(selectedProductId, 10));
      setProduct(productData);
    }
  }, []); // 빈 배열을 넘기면 컴포넌트가 처음 마운트될 때만 실행됩니다.

  const handleAddToCart = () => {
    if (condition === 'A') {
      alert('상품이 장바구니에 담겼습니다.');
      localStorage.setItem('cart', JSON.stringify({ selected: product }));
    } else {
      alert('B조건에서는 장바구니에 담을 수 없습니다. 뒤로가기를 눌러주세요.');
    }
  };

  const handleBack = () => {
    if (condition === 'B') {
      navigate(-1); // 이전 페이지로 이동
    } else {
      alert('A조건에서는 뒤로가기를 누를 수 없습니다. 장바구니를 눌러주세요.');
    }
  };
  const handleProductClick = (productId) => {
    // Store selected product ID in localStorage
    localStorage.setItem('selectedProductId', productId);
  };

  const handleBuyNow = () => {
    alert('실험 절차에 따라 장바구니 담기 혹은 뒤로가기만 누를 수 있습니다.');
  };

  if (!product) {
    return <p>상품 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div className={styles.productDetailContainer}>
      <h1>Product Detail Page</h1>
      <div>
        <img src={product.imageUrl} alt={product.name} width="392" height="392" />
      </div>

      <div className={style_des.descriptions} style={{flexDirection: "column" , padding: 30, fontSize: 24}} >
          <ProductCard 
              id={product.id} 
              productName={product.name} 
              productPrice={product.price} 
              onProductClick={handleProductClick} 
            />
      <div className={styles.productDetailActions} style={{padding: 10}}>
        <button className={styles['prod-cart-btn']} onClick={handleBack}>
          <span className={styles['prod-cart-btn__txt']}>뒤로가기</span>
        </button>
        <button className={styles['prod-cart-btn']} onClick={handleAddToCart}>
          <span className={styles['prod-cart-btn__txt']}>장바구니 담기</span>
        </button>
        <button className={styles['prod-buy-btn']} onClick={handleBuyNow}>
          <span className={styles['prod-buy-btn__txt']}>바로구매</span>
        </button>
      </div>
          </div>

    </div>
  );
};

export default ProductDetail;
