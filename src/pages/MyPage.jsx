import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.css';
import mypageImg from '../images/mypageimg.svg';
import buttonImage from '../images/arrow_back.png'


const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    id: '',
    profileImage: '',
  });

  const [isEditing, setIsEditing] = useState(false);  
  const [newNickname, setNewNickname] = useState(userInfo.nickname); 

  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 로드
    const savedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {
      nickname: '기본닉네임',
      id: 'example@example.com',
      profileImage: '', 
    };

    setUserInfo(savedUserInfo);
    setNewNickname(savedUserInfo.nickname); 
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          profileImage: reader.result, // base64로 이미지 저장
        }));
        // 로컬 스토리지 업데이트
        localStorage.setItem('userInfo', JSON.stringify({
          ...userInfo,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file); 
    }
  };

  // 회원탈퇴 처리
  const handleDeleteAccount = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };
  const handleMain = () => {
    localStorage.removeItem('userInfo'); 
    navigate('/'); 
  };
  const handleHeartShop = () => {
    localStorage.removeItem('userInfo'); 
    navigate('/'); 
  };
  const handleLogout = () => {
    localStorage.removeItem('userInfo'); 
    navigate('/'); 
  };


  const handleEditClick = () => {
    setIsEditing(true); 
  };

  // 닉네임 저장 처리
  const handleSaveClick = () => {
    setUserInfo((prev) => ({
      ...prev,
      nickname: newNickname, // 변경된 닉네임을 상태에 저장
    }));
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, nickname: newNickname })); // 로컬스토리지 업데이트
    setIsEditing(false); 
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value); // 입력된 값으로 닉네임 상태 업데이트
  };

  // 파일 선택 input 참조
  const fileInputRef = React.createRef();

  // 사진 수정 버튼 클릭 시 파일 선택 input 열기
  const handlePhotoEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mypage-container">
        <button onClick={() => navigate(-1)} className="backButton">
        <img src={buttonImage} alt="back-button"/>
      </button>
      <h1 className="signup-title">마이페이지</h1>

      <div className="profile-section">
        <img
          src={userInfo.profileImage || mypageImg}
          alt="프로필 사진"
          className="profile-image"
        />
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImageChange}
          className="image-upload-input"
          accept="image/*"
          style={{ display: 'none' }} 
        />
        <button
          type="button"
          className="image-upload-button"
          onClick={handlePhotoEditClick}
        >
          사진 수정
        </button>
      </div>

      <div className="user-info">
        <div className="info-item">
          <label>닉네임:</label>
          {isEditing ? (
            <input 
              type="text"
              value={newNickname}
              onChange={handleNicknameChange}
              className="info-item"
            />
          ) : (
            <span className="info-text">{userInfo.nickname}</span>
          )}
          <button 
            onClick={handleEditClick} 
            className="nick-edit-button"
            disabled={isEditing} 
          >
            수정
          </button>
        </div>
        <div className="info-item">
          <label>ID:</label>
          <span className="info-text">{userInfo.id}</span>
        </div>
      </div>

      <div className="button-group">
        {isEditing && (
          <button onClick={handleSaveClick} className="login-input">
            닉네임 변경 저장
          </button>
        )}
         <button onClick={handleMain} className="login-input">
          홈
        </button>
        <button onClick={handleHeartShop} className="login-input">
          찜한 소품샵
        </button>
        <button onClick={handleLogout} className="login-input">
          로그아웃
        </button>
        <button onClick={handleDeleteAccount} className="logout-btn">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
