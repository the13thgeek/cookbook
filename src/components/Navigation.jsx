import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  }

  const closeMenu = () => {
    menuRef.current.style.right = "-255px";
  }

  return (
    <div className='nav-area'>
      <button className='mobile-menu' onClick={openMenu}><img src='/img/menu.png' alt='Menu' /></button>
      <nav>
        <ul className='nav-menu' ref={menuRef}>
          <button className='menu-close' onClick={closeMenu}>&times;</button>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/recipe/surprise">Surprise</NavLink></li>
          <li><NavLink to="/favorites">Favorites</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation