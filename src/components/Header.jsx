import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginIcon } from '../images/loginperson.svg';
import { ReactComponent as MyPageIcon } from '../images/logincat.svg'; 
import '../styles/Header.css';

function Header() {
  // 로컬 스토리지에서 로그인 상태 확인
  const isLoggedIn = localStorage.getItem('userInfo') !== null; 
  return (
    <header className="header">
      <nav className="login-icon">
        {isLoggedIn ? (
          <Link to="/mypage">
            <MyPageIcon /> 
          </Link>
        ) : (
          <Link to="/login">
            <LoginIcon />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
