/* global kakao */
import React, { useEffect, useState } from 'react';
import '../styles/CurrentLocationPage.css';
import markerImage from '../images/marker.png'; 
import arrowBackIcon from '../images/arrow-back.png'; 
import { Frame, Frame1, Frame2, Frame3, Frame4, Frame5 } from '../images/frameBundle';
import { fetchShopsByTag } from '../api/shopApi';
import { useNavigate } from 'react-router-dom';
import store1 from '../images/store1.png';//여기서부턴 더미데이터 파일 
import store2 from '../images/store2.png'; 
import store3 from '../images/store3.png'; 

function CurrentLocationPage() {
  const [centerCoords, setCenterCoords] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('주소를 가져오는 중입니다...');
  const navigate = useNavigate(); 

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f89da0d10feffac4a0d5da040f655491&libraries=services&autoload=false';
    script.onload = () => {
      kakao.maps.load(() => {
        initializeMap();
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenterCoords({ lat, lng });
          createMap(lat, lng);
          getAddress(lat, lng);
        },
        (error) => {
          console.error('Geolocation error:', error);
          const fallbackLat = 33.450701;
          const fallbackLng = 126.570667;
          setCenterCoords({ lat: fallbackLat, lng: fallbackLng });
          createMap(fallbackLat, fallbackLng);
          getAddress(fallbackLat, fallbackLng);
        }
      );
    } else {
      console.error('Geolocation을 사용할 수 없습니다.');
      const fallbackLat = 33.450701;
      const fallbackLng = 126.570667;
      setCenterCoords({ lat: fallbackLat, lng: fallbackLng });
      createMap(fallbackLat, fallbackLng);
      getAddress(fallbackLat, fallbackLng);
    }
  }

  function createMap(lat, lng) {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const imageSize = new kakao.maps.Size(24, 35); 
    const imageOption = { offset: new kakao.maps.Point(12, 35) }; // 오프셋은 이미지의 어느 부분이 위치를 가리킬지 정합니다.
    const markerImageObject = new kakao.maps.MarkerImage(markerImage, imageSize, imageOption);

    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const customMarker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImageObject
    });
    customMarker.setMap(map);
    searchNearbyShops(map);
    function searchNearbyShops(map) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch('소품샵', (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach(place => {
            displayMarker(map, place);
          });
        }
      });
    }
    
    function displayMarker(map, place) {

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
    });
  
 
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });
  }
    kakao.maps.event.addListener(map, 'center_changed', () => {
      const center = map.getCenter();
      setCenterCoords({ lat: center.getLat(), lng: center.getLng() });
      getAddress(center.getLat(), center.getLng());
    });
  }

  function getAddress(lat, lng) {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const addressName = result[0].address.address_name;
        setAddress(addressName);
      } else {
        setAddress('주소를 가져올 수 없습니다.');
      }
    });
  }

  const handleImageClick = async (tag) => {
    if (!centerCoords.lat || !centerCoords.lng) {
      alert('현재 위치를 확인할 수 없습니다.');
      return;
    }
    /*
    const accessToken = 'your-access-token'; 
  
    try {
      const data = await fetchShopsByTag(
        tag,
        centerCoords.lat,
        centerCoords.lng,
        accessToken
      );*/
      
      const mockShops = [
        { id: 1, name: '멜로우 피치', tag: '힐링', image: store1 },//더미데이터
        { id: 2, name: '후카후카 스튜디오', tag: '힐링', image: store2 },
        { id: 3, name: '고양이가 있는 액자가게', tag: '힐링', image: store3 },
      ];
  navigate('/shop-list', { state: { shops: mockShops } });//실제 연결할떄는 mockShops-> data로 바꾸기
    /*} catch (error) {
      console.error('Error fetching shop data:', error);
    }*/
  };
  

  return (
    <div className='main-container'>
      <div className='Backarrow-container'>
        <img className='arrow' alt='icon' src={arrowBackIcon} />
      </div>
      <div className='location-container'>
        <div id="map" style={{ width: '98%', height: '60%' }}></div>
        <div className='current-bottom-container'>
          <div className='current-text-container1'>
            <a>주소: {address}</a>
          </div>
          <div className='current-text-container2'>
            <a>#카테고리로 찾아보세요!</a>
          </div>
          <div className='current-img-container'>
            <div className='inside-img-container1'>

              <img className="frame"
                alt="힐링"
                src={Frame}
                onClick={() => handleImageClick('힐링')}/>
              <img className="frame"
                alt="힙합/트렌디"
                src={Frame1}
                onClick={() => handleImageClick('힙합/트렌디')}/>
              <img className="frame"
                alt="귀여운/키치"
                src={Frame2}
                onClick={() => handleImageClick('귀여운/키치')}/>
            </div>
            <div className="inside-text-container1">
              <a onClick={() => handleImageClick('힐링')}>힐링</a>
              <a onClick={() => handleImageClick('힙합/트렌디')}>힙합/트렌디</a>
              <a onClick={() => handleImageClick('귀여운/키치')}>귀여운/키치</a>
            </div>
            <div className='inside-img-container2'>
            <img className="frame"
              alt="빈티지/레트로"
              src={Frame3}
              onClick={() => handleImageClick('빈티지/레트로')}/>
            <img className="frame"
              alt="가챠/뽑기"
              src={Frame4}
              onClick={() => handleImageClick('가챠/뽑기')}/>
            <img className="frame"
              alt="모던/심플"
              src={Frame5}
              onClick={() => handleImageClick('모던/심플')}/>
            </div>
            <div className='inside-text-container2'>
              <a onClick={() => handleImageClick('빈티지/레트로')}>빈티지/레트로</a>
              <a onClick={() => handleImageClick('가챠/뽑기')}>가챠/뽑기</a>
              <a onClick={() => handleImageClick('모던/심플')}>모던/심플</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentLocationPage;