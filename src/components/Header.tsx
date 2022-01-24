import React from 'react'
import HeaderLogo from '../assets/image/image_icon.png';
import { ReactComponent as LoveIcon } from '../assets/image/love_icon.svg';
import { NavLink } from 'react-router-dom';

import '../assets/scss/Header.scss'

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    return (
      <nav className='header'>
        <div className='header-container'>
          <NavLink to="/">
            <div className='header__logo'>
              <img src={HeaderLogo} alt="header_logo" className='header__logo-icon' />
              <h1 className='header__logo-title'>Photonesia</h1>
            </div>
          </NavLink>
          <div className='header__menu'>
            <NavLink to="/favorite">
              <LoveIcon className='header__menu-icon' />
            </NavLink>
          </div>
        </div>
      </nav>
    );
}

export default Header;
