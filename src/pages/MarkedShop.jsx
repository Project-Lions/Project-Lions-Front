import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MarkedShop.css';
import buttonImage from '../images/arrow_back.png'

const MarkedShop = ({ shops }) => {
  const [likedShops, setLikedShops] = useState([]);
  const navigate = useNavigate();

  const testData = [
    {
      shopName: "소품샵1",
      latitude: "Decimal",
      longitude: "Decimal",
      openAt: "10:00",
      closeAt: "22:00",
      image: "String-url",
    },
    {
      shopName: "소품샵2",
      latitude: "Decimal",
      longitude: "Decimal",
      openAt: "11:00",
      closeAt: "20:00",
      image: "String-url",
    },
  ];

  useEffect(() => {
    const getShops = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // 액세스 토큰 가져오기
        const response = await axios.get('<백엔드배포URI>/api/shops/like', {
          headers: {
            Authorization: `Bearer ${token}`, // 수정된 Authorization 헤더
          },
        });
        setLikedShops(response.data);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
        setLikedShops(testData); // 테스트 데이터 설정
      }
    };
    getShops();
  }, []);

  const handleShopClick = (shopName) => {
    navigate(`/details`);
  };

  return (
    <div className="shop-list">
      <button onClick={() => navigate(-1)} className="backButton">
        <img src={buttonImage} alt="back-button"/>
      </button>
      <div className="markedShop-title">찜한 shop</div>
      {likedShops.map((shop, index) => (
        <div
          className="shop-info"
          key={index}
          onClick={() => handleShopClick(shop.shopName)}
          style={{ cursor: 'pointer' }}
        >
          <img src={shop.image} alt={shop.shopName} className="shop-image" />
          <div className="shop-word-sec">
            <div className="shop-name">{shop.shopName}</div>
            <br />
            <div>주소</div>
            <div className="shop-hours">
              매일
              <br />
              {shop.openAt} - {shop.closeAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarkedShop;
