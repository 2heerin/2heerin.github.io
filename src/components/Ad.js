import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>광고 노출</h1>
      {adData.imageUrl && <img src={adData.imageUrl} alt="Ad" />}
      <p>{adData.adMessage}</p>
      {showButton && (
        <button onClick={() => navigate("/checkout")}>다음으로</button>
      )}
    </div>
  );
};

export default Ad;
