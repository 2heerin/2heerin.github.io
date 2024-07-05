import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../components/Adfirst.module.css";

const AdFirst = () => {
    const navigate = useNavigate();
    const cartItemString = localStorage.getItem('cart');
    const cartItem = cartItemString ? JSON.parse(cartItemString) : null;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/ad');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.adfirstContainer}>
            <h1>지금부터 귀하가 장바구니에 담은 제품 {cartItem?.selected?.name}에 대한 광고가 노출됩니다</h1>
        </div>
    );
};

export default AdFirst;
