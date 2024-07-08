import React, { useEffect, useState } from 'react';
import styles from './order.module.css'; // CSS 모듈 임포트

function Order({ id,productPrice, onProductClick }) {
    const handleClick = () => {
      console.log('Clicked product ID:', id);
      localStorage.setItem('selectedProductId', id); // 클릭된 제품의 ID를 localStorage에 저장
      onProductClick(id); // 선택된 제품을 처리하는 콜백 함수 호출
    };
  
    return (
    <><div onClick={handleClick} className={styles.descriptions}>
            <div className={styles.title} style={{ color: 'black' }}>주문 예상 금액</div>
            <div className={styles.box}>
                <div className={styles.name} style={{ marginRight: 200 }}>총 상품 가격</div>
                <strong className={styles.price_value}>
                    {productPrice.toLocaleString()}원
                </strong>
            </div>
            <div className={styles.box}>
                <div className={styles.name} style={{ marginRight: 255 }}>총 배송비</div>
                <span className={styles.price_value}>+0원</span>
            </div>
        </div><div className={styles.box_line}>
            </div><div className={styles.descriptionsR}>
                <strong className={styles.price_right}>
                    {productPrice.toLocaleString()}원
                </strong>
            </div></>

    );
  }
  
  export default Order;