import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>설문 조사 페이지로 이동</h1>
      <button onClick={() => navigate('/survey')}>설문 조사 하기</button>
    </div>
  );
};

export default Checkout;
