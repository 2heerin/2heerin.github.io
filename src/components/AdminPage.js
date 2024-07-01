import React, { useState, useEffect } from 'react';

const AdminPage = ({ initialProducts, setCondition, setProducts, setAdData }) => {
  const [newCondition, setNewCondition] = useState('A');
  const [newProducts, setNewProducts] = useState([]);
  const [newAdData, setNewAdData] = useState({ imageUrl: '', adMessage: '' });

  useEffect(() => {
    // 초기 상품 데이터를 localStorage에서 불러오기
    const savedProducts = JSON.parse(localStorage.getItem('products')) || initialProducts;
    setNewProducts(savedProducts);

    // 시작 시 저장된 값을 불러오기
    const savedCondition = localStorage.getItem('condition');
    const savedAdData = JSON.parse(localStorage.getItem('adData'));

    if (savedCondition) setNewCondition(savedCondition);
    if (savedAdData) setNewAdData(savedAdData);
  }, []);
  const handleSave = () => {
    // 조건 저장
    localStorage.setItem('condition', newCondition);
    setCondition(newCondition);
    
    // 광고 데이터 저장
    localStorage.setItem('adData', JSON.stringify(newAdData));
    setAdData(newAdData);
    
    // 제품 데이터 저장
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
    updatedProducts.splice(index, 1); // 해당 인덱스의 제품 삭제
    setNewProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    const emptyProduct = { name: '', price: '', imageUrl: '' };
    setNewProducts([...newProducts, emptyProduct]);
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
      <div>
        <h2>조건 설정</h2>
        <select value={newCondition} onChange={(e) => setNewCondition(e.target.value)}>
          <option value="A">A조건</option>
          <option value="B">B조건</option>
        </select>
      </div>

      <div>
        <h2>광고 이미지와 메시지 설정</h2>
        <input 
          type="text" 
          placeholder="이미지 URL" 
          value={newAdData.imageUrl} 
          onChange={(e) => setNewAdData({ ...newAdData, imageUrl: e.target.value })} 
        />
        <textarea 
          placeholder="광고 메시지" 
          value={newAdData.adMessage} 
          onChange={(e) => setNewAdData({ ...newAdData, adMessage: e.target.value })} 
        />
      </div>

      <div>
        <h2>제품 설정</h2>
        {newProducts.map((product, index) => (
          <div key={index}>
            <input 
              type="text" 
              placeholder="제품 이름" 
              value={product.name} 
              onChange={(e) => handleProductChange(index, 'name', e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="제품 가격" 
              value={product.price} 
              onChange={(e) => handleProductChange(index, 'price', e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="제품 이미지 URL" 
              value={product.imageUrl} 
              onChange={(e) => handleProductChange(index, 'imageUrl', e.target.value)} 
            />
            <button onClick={() => handleProductDelete(index)}>삭제</button> {/* 삭제 버튼 추가 */}
          </div>
        ))}
        <button onClick={handleAddProduct}>제품 추가</button>
      </div>

      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default AdminPage;
