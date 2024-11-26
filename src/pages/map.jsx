import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const loadKakaoMaps = () => {
      const script = document.createElement('script');
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f89da0d10feffac4a0d5da040f655491&libraries=services&autoload=false';
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.557, 126.924), // 홍대 지역 좌표
          level: 3
        };
        const map = new kakao.maps.Map(container, options);
        searchNearbyShops(map);
      });
    };

    const searchNearbyShops = (map) => {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch('소품샵', (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          displayMarkers(map, data);
        }
      }, {
        location: new kakao.maps.LatLng(37.557, 126.924),
        radius: 500
      });
    };

    const displayMarkers = (map, places) => {
      places.forEach(place => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x)
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', () => {
          const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;">' + place.place_name + '</div>'
          });
          infowindow.open(map, marker);
        });
      });
    };

    loadKakaoMaps();

    return () => {
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;
