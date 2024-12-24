import React from 'react';
import Navigation from './Navigation';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <h1><a href="/">cook<b>book</b></a></h1>
      <Navigation />
    </header>
  )
}

export default Header