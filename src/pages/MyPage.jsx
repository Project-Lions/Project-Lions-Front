import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.css'; 

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    id: '',
    profileImage: '', 
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 예시로 로컬스토리지나 API에서 가져오는 형태로 작성
    const savedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {
      nickname: '기본닉네임',
      id: 'example@example.com',
      profileImage: '', // 기본 이미지
    };

    setUserInfo(savedUserInfo);
  }, []);

  const handleImageChange = (e) => {
    // 이미지 변경 기능 
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          profileImage: reader.result, // base64로 이미지 저장
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (action) => {
    alert(`${action} 버튼 클릭!`);
  };

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem('userInfo'); // 로컬스토리지에서 사용자 정보 제거
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className="mypage-container">
      <h1 className="signup-title">마이페이지</h1>


      <div className="profile-section">
        <img
          src={userInfo.profileImage || 'logo192.png'}
          alt="프로필 사진"
          className="profile-image"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="image-upload-input"
          accept="image/*"
        />
        <button className="image-upload-button">사진 수정</button>
      </div>


      <div className="user-info">
        <div className="info-item">
            <label>닉네임:</label>
            <span className="info-text">{userInfo.nickname}</span>
        </div>
        <div className="info-item">
            <label>ID:</label>
            <span className="info-text">{userInfo.id}</span>
        </div>
        </div>


      <div className="button-group">
      <button onClick={() => handleButtonClick('찜한 소품샵')} className="login-input">
          찜한 소품샵
        </button>
        <button onClick={handleLogout} className="login-input">
          로그아웃
        </button>
        <button onClick={() => handleButtonClick('회원탈퇴')} className="logout-btn">
        회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
