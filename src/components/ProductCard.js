import React from 'react';
import styles from '../description.module.css'; // CSS 모듈 임포트
import Rate from '../assets/rate.png';

function ProductCard({ id, productName, productPrice, onProductClick }) {
  const discountRate = 0.19; // 할인율 19%
  const originalPrice = Math.round(productPrice / (1 - discountRate)).toLocaleString(); // 원래 가격 계산 및 포매팅

  const handleClick = () => {
    console.log('Clicked product ID:', id);
    localStorage.setItem('selectedProductId', id); // 클릭된 제품의 ID를 localStorage에 저장합니다.
    onProductClick(id); // 선택된 제품을 처리하는 콜백 함수를 호출합니다.
  };

  return (
    <dd className={styles.descriptions} onClick={handleClick}>
      <div className={styles['descriptions-inner']}>
        <div className={styles.name}>{productName}</div>
        <div className={styles['price-area']}>
          <div className={styles['price-wrap']}>
            <div className={styles.price}>
              <span className={styles['price-info']}>
                <span className={styles['instant-discount-rate']}>{Math.round(discountRate * 100)}%</span>
                <del className={styles['base-price']}>{originalPrice}원</del>
              </span>
              <em className={styles.sale}>
                <strong className={styles['price-value']} style={{ color: '#cb1400' }}>
                  {productPrice.toLocaleString()}원
                </strong>
                <span className={styles.badge}>
                  <img
                    src="https://image8.coupangcdn.com/image/badges/falcon/v1/web/rocketwow-bi-16@2x.png"
                    height="16"
                    alt="로켓배송"
                  />
                </span>
              </em>
            </div>
            <div className={styles.delivery}>
              <span className={styles['arrival-info']}>
                <em style={{ color: '#008C00' }}>오늘(목) 도착 보장</em>
                <div>
                  <span style={{ fontSize: '14px', color: '#454F5B' }}>무료배송 ∙ 무료반품</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className={styles['rating-star']} style={{flexDirection: "row", marginLeft: -10}}>
            <img src={Rate} width="80" height="40" alt="5.0" />
            <span className={styles['rating-total-count']} style={{ justifyContent: "flex-start" , alignContent: "flex-start"}}>
            (13702)
             </span>
        </div>
        <div className={styles['benefit-badges']}>
          <div className={styles['reward-cash-badge']}>
            <div className={styles['reward-cash-badge__inr']} style={{flexDirection: "row"}}>
              <img
                src="https://image6.coupangcdn.com/image/badges/cashback/web/list-cash-icon@2x.png"
                alt=""
                className={styles['reward-cash-ico']}
              />
              <span className={styles['reward-cash-txt']} style={{justifycontent: "flex-start"}} >최대 124원 적립</span>
            </div>
          </div>
        </div>
      </div>
    </dd>
  );
}

export default ProductCard;
