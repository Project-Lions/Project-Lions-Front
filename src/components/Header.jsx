import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginIcon } from '../images/loginperson.svg';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="login-icon">
        <Link to="/login" >
          <LoginIcon /> 
        </Link>
      </nav>
    </header>
  );
}

export default Header;
