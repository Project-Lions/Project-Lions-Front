import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { arrowBackIcon, rabbitIcon, mapLocationIcon, searchIcon, rabbit2Icon } from '../images/iconBundle';
import '../styles/AccentShops.css';

function AccentShops() {
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate('/currentLocationPage'); 
  };

  return (
    <div className='Accentshops-container'>
      <div className='Backarrow-container'>
        <img className='arrow' alt='icon' src={arrowBackIcon} />
      </div>
      <div className='Accentshops-top-container'>
        <img className='rabbit' alt='r' src={rabbitIcon} />
      </div>
      <div className='Accentshops-main-container'>
        <div className='text-container1'>
          <a>주변 소풍샵 정보</a>
        </div>
        <div 
          className='text-container2' 
          onClick={handleNavigate} 
        >
          <img className='map' alt='r' src={mapLocationIcon} />
          <a>현재 위치로 찾아보기!</a>
        </div>
        <div className='text-container3'>
          <div className='form-container'>
            <form className='search'>주변 검색</form>
            <img className='searc' alt='r' src={searchIcon} />
          </div>
          <a>직접 찾아보기!</a>
        </div>
      </div>
      <div className='map-container'>
        <img className='rabbit' alt='r' src={rabbit2Icon} />
      </div>
    </div>
  );
}

export default AccentShops;
