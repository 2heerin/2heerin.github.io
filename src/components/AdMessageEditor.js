import React, { useState } from 'react';

const AdMessageEditor = ({ setAdMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleUpdateMessage = () => {
    setAdMessage(inputMessage);
  };

  return (
    <div>
      <textarea value={inputMessage} onChange={handleInputChange} />
      <button onClick={handleUpdateMessage}>Update Message</button>
    </div>
  );
};

export default AdMessageEditor;
