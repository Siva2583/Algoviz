import React from 'react';
import ModeToggle from './ModeToggle';
import Logo from '../pages/logo.png'; // This path must be correct
import '../styles/global.css';

const Header = () => {
  return (
    <nav className="navbar">
      {/* Toggle in the Center */}
      <ModeToggle />

      {/* Logo on the Right */}
      <img src={Logo} alt="AlgoViz Logo" className="nav-logo" />
    </nav>
  );
};

export default Header;