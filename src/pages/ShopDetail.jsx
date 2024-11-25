import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import buttonImage from '../images/arrow_back.png';
import shopImg from '../images/멜로우피치_귀여운 1 (1).png';
import phone from '../images/Call.png';
import mapMarker from '../images/1495574559-map-location-solid-style-01_84581 2@2x.png'
import checker from '../images/Check Square.png'
import shopsImg from '../images/멜로우피치_귀여운 1 (1).png'
import '../styles/ShopDetail.css'

const ShopDetail = () => {
  const { shopName } = useParams(); // URL에서 shopName 추출
  const [shopDetails, setShopDetails] = useState(null);
  const navigate = useNavigate();

  const testData = 
    {
    id: "Long",
    image: {shopsImg},
    shopName: "소품샵1",
    ownerPhone: "010-1234-5678",
    latitude: "Decimal",
    longitude: "Decimal",
    openAt: "10:00",
    closeAt: "22:00",
    likeShop: "LIKE",  //UNLIKE, LIKE
    shopTags: "세련됨",
    description:"연남동 미로골목 작은 잡화점.고양이가있는액자가게 입니다. 국내.외 작가님들의 고양이 작품들과 그림 두 집사가 나누고 싶은 소소한 소품들을 소개, 판매하고 있습니다. 냥냥냥 고양이가 부르는 노래 들으러 오세요",
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
              <div>{shopDetails.address}</div>
              <div>매일 {shopDetails.openAt} - {shopDetails.closeAt}</div>
              <div>{shopDetails.ownerPhone}</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ShopDetail;