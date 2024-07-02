import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Ad.module.css";
const Ad = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [adData, setAdData] = useState({ imageUrl: '', adMessage: '' });

  useEffect(() => {
    const savedAdData = JSON.parse(localStorage.getItem('adData'));
    if (savedAdData) {
      setAdData(savedAdData);
    }
    const timeout = setTimeout(() => {
      setShowButton(true);
      alert("제품을 충분히 보셨다면 다음으로 버튼을 눌러주세요")
    }, 10000);
    

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {adData.imageUrl && <img src={adData.imageUrl} alt="Ad" />}
      <p className={styles.adMessage}>{adData.adMessage}</p>
      {showButton && (
        <button className={styles.btn1} onClick={() => navigate("/checkout")}>
        다음으로
        </button>
      )}
    </div>
  );
};

export default Ad;
