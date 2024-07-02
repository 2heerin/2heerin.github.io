import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Checkout.module.css"
const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={styles.text}>마지막으로, 아래 설문 참가하기 링크를 눌러서</h1>
      <h1 className={styles.text}>설문조사에 응답바랍니다.</h1>
      <a className={styles.text} target="_blank" href="https://www.google.com/webhp?hl=ko&sa=X&ved=0ahUKEwj7s_HI7oiHAxWqi68BHSmHC7oQPAgI" >설문참가하기</a>
    </div>
  );
};

export default Checkout;
