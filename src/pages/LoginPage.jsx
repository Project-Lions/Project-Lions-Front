import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LoginCatIcon } from '../images/logincat.svg'; // logincat.svg를 ReactComponent로 임포트
import '../styles/LoginPage.css';
import buttonImage from '../images/arrow_back.png'


function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (savedUserInfo && savedUserInfo.id === id && savedUserInfo.password === password) {
      navigate('/'); 
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className='login-wide'>
    <div className="login-page">
    <button onClick={() => navigate(-1)} className="backButton">
        <img src={buttonImage} alt="back-button"/>
      </button>
      <LoginCatIcon className="login-cat-icon" />
      
      <h2 className="login-text">로그인</h2>
      
      <div className="login-container">
        <input type="text" placeholder="ID:" className="login-input" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" placeholder="PW:" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <button onClick={handleLogin} className="login-btn">OK</button>


      <div className="footer-links">
        <Link to="/find-id-pw" className="footer-link">ID/PW 찾기</Link>
        <Link to="/signup" className="footer-link">회원가입</Link>
      </div>
    </div></div>
  );
  
}

export default LoginPage;