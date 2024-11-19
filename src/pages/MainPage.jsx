import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import Header from '../components/Header';
import { ReactComponent as MainIcon } from '../images/main.svg';
import '../styles/MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  // 로그인 상태 확인 (localStorage에 "isLoggedIn" 키가 있다고 가정)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleIconClick = () => {
    if (isLoggedIn) {
      navigate('/mypage'); // 로그인 상태일 때 마이페이지로 이동
    } else {
      navigate('/login'); // 로그인 상태가 아닐 때 로그인 페이지로 이동
    }
  };


  return (
    <div className="main-page">
      <Header />
      <main className="main-content">
       <MainIcon className="main-image" onClick={handleIconClick} />

        <div className="button-container">
          <button className="main-button">주변 소품샵 정보</button>
          <button className="main-button">찜한 소품샷</button>
          <button className="main-button">채팅</button>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
