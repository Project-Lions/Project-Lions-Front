import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginCatIcon } from '../images/logincat.svg'; // logincat.svg를 ReactComponent로 임포트
import '../styles/LoginPage.css';

function LoginPage() {



  return (
    <div className="login-page">
      <LoginCatIcon className="login-cat-icon" />
      
      <h2 className="login-text">로그인</h2>
      
      <div className="login-container">
        <input type="text" placeholder="ID:" className="login-input" />
        <input type="password" placeholder="PW:" className="login-input" />
      </div>
      
      <Link to="/" className="login-btn" >
        OK
      </Link>

      <div className="footer-links">
        <Link to="/find-id-pw" className="footer-link">ID/PW 찾기</Link>
        <Link to="/signup" className="footer-link">회원가입</Link>
      </div>
    </div>
  );
}

export default LoginPage;
