import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/admin">관리자</Link>
    </nav>
  );
};

export default NavBar;
