import React from 'react';
import { useLocation } from 'react-router-dom';
import Frame from '../images/Frame.png';
import Frame1 from '../images/Frame-1.png';
import Frame2 from '../images/Frame-2.png';
import Frame3 from '../images/Frame-3.png';
import Frame4 from '../images/Frame-4.png';
import Frame5 from '../images/Frame-5.png';
import arrowBackIcon from '../images/arrow-back.png'; 
import '../styles/ShopList.css'

const tagImageMap = {
  '힐링': Frame,
  '힙합/트렌디': Frame1,
  '귀여운/키치': Frame2,
  '빈티지/레트로': Frame3,
  '가챠/뽑기': Frame4,
  '모던/심플': Frame5,
};

const ShopList = () => {
  const location = useLocation();


  const shops = location.state?.shops || []; 
  console.log('Shops:', shops); // 데이터 디버깅(잘 넘어오는지 확인)

  const firstTag = shops[0]?.tag;

  const tagImage = tagImageMap[firstTag];

  return (
  <div className='shoplist-maincontainer'>
    <div className='Backarrow-container'>
      <img className='arrow' alt='icon' src={arrowBackIcon} />
    </div>
      <div className='content-container'>   
        <div className='tag-container'>
          <img className ='image'
            src={tagImage}
            alt="태그 이미지"/>
        </div>


        <div className='shoplist-content-container'>
          {shops.map((shop, index) => {
            return (
              <div className ='shoplist-content'
              key={index}>
                <img src={shop.image} 
                  alt="가게 이미지"/>
                <div className='text'><a>{shop.name}</a></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopList;
