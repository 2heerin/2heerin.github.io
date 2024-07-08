import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Ad.module.css";
const Ad = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAdData = async () => {
      const conditionad = JSON.parse(localStorage.getItem('conditionad'));
      console.log('localStorage에서 가져온 conditionad:', conditionad); // 디버깅을 위한 콘솔 로그 추가

      if (conditionad) {
        const storedAdDataList = JSON.parse(localStorage.getItem(`adData${conditionad}`));
        console.log('localStorage에서 가져온 adDataList:', storedAdDataList); // 디버깅을 위한 콘솔 로그 추가

        let matchedAdData;
        if (storedAdDataList && Array.isArray(storedAdDataList)) {
          matchedAdData = storedAdDataList.find(ad => ad.id.toString() === conditionad.toString());
        } else if (storedAdDataList && storedAdDataList.id.toString() === conditionad.toString()) {
          matchedAdData = storedAdDataList;
        } else {
          console.error("유효한 adData가 localStorage에 없습니다.");
        }

        if (matchedAdData) {
          setAdData(matchedAdData);
        } else {
          console.error(`id가 ${conditionad}인 유효한 adData가 localStorage에 없습니다.`);
        }
      } else {
        console.error("유효한 conditionad가 없습니다.");
      }

      setLoading(false); // 데이터 로드 완료
    };

    fetchAdData();

    const timeout = setTimeout(() => {
      setShowButton(true);
      alert("제품을 충분히 보셨다면 다음으로 버튼을 눌러주세요");
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <p style={{ color: 'black' }}>광고 데이터를 불러오는 중...</p>;
  }

  return (
    <div>
      {adData ? (
        <>
          <img src={adData.imageUrl} width="480" height= "480"alt="광고" />
          <p className={styles.adMessage} style={{ color: 'black' }}>{adData.adMessage}</p>
        </>
      ) : (
        <p style={{ color: 'black' }}>유효한 광고 데이터가 없습니다.</p>
      )}
      {showButton && (
        <button className={styles.btn1} onClick={() => navigate('/checkout')}>다음으로</button>
      )}
    </div>
  );
};

export default Ad;
