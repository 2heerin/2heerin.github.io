import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import style_des from "../description.module.css";
import ProductCard from './ProductCard';
const ProductDetail = ({ condition, products }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id를 가져옵니다.
  const [product, setProduct] = useState(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const selectedProductId = localStorage.getItem('selectedProductId');
    const visitCounts = JSON.parse(localStorage.getItem('visitCounts')) || {};

    if (selectedProductId) {
      const productData = products.find(product => product.id === parseInt(selectedProductId, 10));
      setProduct(productData);
      visitCounts[selectedProductId] = (visitCounts[selectedProductId] || 0) + 1;
      localStorage.setItem('visitCounts', JSON.stringify(visitCounts));
      setVisitCount(visitCounts[selectedProductId]);
    }
  }, [id, products]); // id 또는 products가 변경될 때 실행됩니다.


  const handleAddToCart = () => {
    console.log('Condition:', condition);
    const uniqueVisits = Object.keys(JSON.parse(localStorage.getItem('visitCounts')) || {}).length;
    if (condition === 'A' || (condition === 'B' && uniqueVisits >= products.length)) {
      alert('상품이 장바구니에 담겼습니다.');
      localStorage.setItem('cart', JSON.stringify({ selected: product }));
      navigate('/cart')
    } else {
      alert(`B조건에서는 ${products.length}개의 제품 페이지를 전부 확인한 후 장바구니 버튼을 누를 수 있습니다. 뒤로가기 버튼을 눌러주세요.`);
    }
  };

  const handleBack = () => {
    console.log('Condition:', condition);
    if (condition === 'B') {
      navigate(-1); // 이전 페이지로 이동
    } else if (condition === 'A') {
      alert('A조건에서는 뒤로가기를 누를 수 없습니다. 장바구니 담기 버튼을 클릭해 주세요.');
    } else {
      alert('조건이 올바르지 않습니다.');
    }
  };
  const handleProductClick = (productId) => {
    // Store selected product ID in localStorage
    localStorage.setItem('selectedProductId', productId);
  };

  const handleBuyNow = () => {
    console.log('Condition:', condition);
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

  <div className={style_des.descriptions} style={{ flexDirection: 'column',fontSize: 24, width: '390px', height: '390px' }}>
    <ProductCard 
      id={product.id} 
      productName={product.name} 
      productPrice={product.price} 
      onProductClick={handleProductClick} 
    />
    <div className={styles.productDetailActions} style={{ padding: 10 }}>
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
