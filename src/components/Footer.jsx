import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';  
import icon1 from '../images/footer1.svg';
import icon2 from '../images/footer2.svg';
import icon3 from '../images/footer3.svg'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-button">
        <img src={icon1} alt="아이콘 1" className="footer-icon" />
        <p>주변 소품샵 정보</p>
      </div>
      <div className="footer-button">
        <Link to="/marked" className="footer-link">
        <img src={icon2} alt="아이콘 2" className="footer-icon" />
        <p>찜한 소품샵</p>
        </Link>
      </div>
      <div className="footer-button">
      <Link to="/chatpage" className="footer-link">
        <img src={icon3} alt="아이콘 3" className="footer-icon" />
        <p>채팅</p>
        </Link>

      </div>
    </div>
  );
};

export default Footer;
