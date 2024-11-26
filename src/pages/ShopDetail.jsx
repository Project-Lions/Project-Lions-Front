import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import buttonImage from '../images/arrow_back.png';
import phone from '../images/Call.png';
import mapMarker from '../images/1495574559-map-location-solid-style-01_84581 2@2x.png'
import checker from '../images/Check Square.png'
import shopsImg from '../images/ShopPicture.png'
import heart from '../images/Heart.png'
import chattingImg from '../images/chatting.png'
import '../styles/ShopDetail.css'

const ShopDetail = () => {
  const { shopName } = useParams(); // URL에서 shopName 추출
  const [shopDetails, setShopDetails] = useState(null);
  const navigate = useNavigate();
  const toChat = () => {
    navigate('/chatpage');
  };

  const testData = 
    {
    id: "Long",
    image: shopsImg,
    shopName: "옐로우 피치",
    ownerPhone: "010-1234-5678",
    latitude: "Decimal",
    longitude: "Decimal",
    openAt: "13:00",
    closeAt: "21:00",
    likeShop: "LIKE",  //UNLIKE, LIKE
    shopTags: "세련됨",
    description:"연남동 미로골목 작은 잡화점. 고양이가 있는 액자가게입니다. 국내.외 작가님들의 고양이 작품들과 그림 두 집사가 나누고 싶은 소소한 소품들을 소개, 판매하고 있습니다. 냥냥냥 고양이가 부르는 노래 들으러 오세요",
    };

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          `<백엔드 URI>/api/shops/details`, 
          { params: { shopName } }
        );
        setShopDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch shop details:', error);
        setShopDetails(testData);
      }
    };

    fetchShopDetails();
  }, [shopName]);

  if (!shopDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='detail-container'>
        <button onClick={() => navigate(-1)} className="backButton">
        <img src={buttonImage} alt="back-button"/>
        </button>
        <div className='img-area'>
          <img src={shopDetails.image} alt='소품샵 사진' className='shop-img'/>
        </div>
        <div className='shop-info2'>
          <img src={heart} alt='하트' className='heart'/>
          <button onClick={toChat} className='chat-btn'>
            <img src={chattingImg} alt='채팅버튼'></img>
          </button>
          <p className='tag-name'>#{shopDetails.shopTags}</p>
          <p className='shop-name2'>{shopDetails.shopName}</p>
          <div className='dotted'></div>
          <p>{shopDetails.description}</p>
          <div className='dotted'></div>
          <div className='bottom-sec'>
            <div className='icons'>
              <img src={mapMarker} className='imgs'/>
              <img src={checker} className='imgs'/>
              <img src={phone} className='imgs'/>
            </div>
            <div className='word-sec'>
              <div>서울 마포구 동교로41길 4</div>
              <div>매일 {shopDetails.openAt} - {shopDetails.closeAt}</div>
              <div>{shopDetails.ownerPhone}</div>
            </div>
          </div>
      </div>
      
    </div>
  );
};

export default ShopDetail;