// AdFirst.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../components/Adfirst.module.css"
const AdFirst = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/ad');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.adfirstContainer} >
      <h1>지금부터 귀하가 장바구니에 담은 제품 "A"에 대한 광고가 노출됩니다</h1>
    </div>
  );
};

export default AdFirst;
