import React, { useState, useEffect } from 'react';
import styles from "./AdminPage.module.css";

const AdminPage = ({ initialAd, initialProducts, setCondition, setProducts, setAdData,setConditionad }) => {
  const [newCondition, setNewCondition] = useState('A');
  const [newProducts, setNewProducts] = useState([]);
  const [newAdData, setNewAdData] = useState({ imageUrl: '', adMessage: '' });
  const [newConditionad, setNewConditionad] = useState('1');

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || initialProducts;
    setNewProducts(savedProducts);

    const savedCondition = localStorage.getItem('condition');
    const savedAdData = JSON.parse(localStorage.getItem('adData')) || initialAd;
    const savedConditionad = localStorage.getItem('conditionad');

    if (savedCondition) setNewCondition(savedCondition);
    if (savedAdData) setNewAdData(savedAdData);
    if (savedConditionad) setNewConditionad(savedConditionad);
  }, []);

  const handleSave = () => {
    localStorage.setItem('condition', newCondition);
    setCondition(newCondition);

    localStorage.setItem('conditionad', newConditionad);
    setConditionad(newConditionad);

    localStorage.setItem('adData', JSON.stringify(newAdData));
    setAdData(newAdData);

    localStorage.setItem('products', JSON.stringify(newProducts));
    setProducts(newProducts);

    alert('저장되었습니다.');
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...newProducts];
    updatedProducts[index][key] = value;
    setNewProducts(updatedProducts);
  };

  const handleProductDelete = (index) => {
    const updatedProducts = [...newProducts];
    updatedProducts.splice(index, 1);
    setNewProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    const emptyProduct = { name: '', price: '', imageUrl: '' };
    setNewProducts([...newProducts, emptyProduct]);
  };

  const handleConditionadChange = (e) => {
    const selectedConditionad = e.target.value;
    setNewConditionad(selectedConditionad);

    if (selectedConditionad === "1") {
      setNewAdData({
        imageUrl: 'url_for_condition_1_image',
        adMessage: 'Ad message for condition 1',
      });
    } else if (selectedConditionad === "2") {
      setNewAdData({
        imageUrl: 'url_for_condition_2_image',
        adMessage: 'Ad message for condition 2',
      });
    }
  };

  const handleAdDataChange = (key, value) => {
    setNewAdData({ ...newAdData, [key]: value });
  };

  return (
    <div className={styles.adminContainer}>
      <div style={{ justifyContent: "center" }}>
        <div>
          <h2>실험 조건 설정</h2>
          <select className={styles.custom_ad_input} style={{ textAlign: 'center' }} value={newCondition} onChange={(e) => setNewCondition(e.target.value)}>
            <option value="A">A조건</option>
            <option value="B">B조건</option>
          </select>
        </div>
        <div>
          <h2>광고 조건 설정</h2>
          <select className={styles.custom_ad_input} style={{ textAlign: 'center' }} value={newConditionad} onChange={handleConditionadChange}>
            <option value="1">조건 1</option>
            <option value="2">조건 2</option>
          </select>
        </div>

        <div>
          <h2>광고 이미지와 메시지 설정</h2>
          <input
            className={styles.custom_ad_input}
            style={{ justifyContent: 'center' }}
            type="text"
            placeholder="이미지 URL"
            value={newAdData.imageUrl}
            onChange={(e) => handleAdDataChange('imageUrl', e.target.value)}
          />
          <textarea
            className={styles.custom_ad_input}
            style={{ justifyContent: 'center' }}
            placeholder="광고 메시지"
            value={newAdData.adMessage}
            onChange={(e) => handleAdDataChange('adMessage', e.target.value)}
          />
        </div>

        <div className={styles.productContainer}>
          <h2>제품 설정</h2>
          {newProducts.map((product, index) => (
            <div style={{ flexDirection: 'row' }} key={index}>
              <input
                className={styles.custom_ad_input}
                type="text"
                placeholder="제품 이름"
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              />
              <input
                className={styles.custom_ad_input}
                type="text"
                placeholder="제품 가격"
                value={product.price}
                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
              />
              <input
                className={styles.custom_ad_input}
                type="text"
                placeholder="제품 이미지 URL"
                value={product.imageUrl}
                onChange={(e) => handleProductChange(index, 'imageUrl', e.target.value)}
              />
              <button className={styles.btn1} onClick={() => handleProductDelete(index)}>
                <span className={styles.btn1_txt}>삭제</span>
              </button>
            </div>
          ))}
        </div>
        <div className={styles.productContainer} style={{ flexDirection: "row", justifyContent: "center" }}>
          <button className={styles.btn2} style={{ marginRight: 10 }} onClick={handleAddProduct}>
            <span className={styles.btn2_txt}>제품추가</span>
          </button>

          <button className={styles.btn2} onClick={handleSave}>
            <span className={styles.btn2_txt}>저장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
