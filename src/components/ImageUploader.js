import React, { useState } from 'react';

const ImageUploader = ({ setImageUrl }) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleUpload = () => {
    setImageUrl(inputUrl);
  };

  return (
    <div>
      <input type="text" value={inputUrl} onChange={handleInputChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
