import React from "react";

interface HeaderProps {
  navBarComponent: JSX.Element;
}

// header component for authenticated users
const Header: React.FC<HeaderProps> = ({ navBarComponent }) => (
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
      <span className="logo d-flex align-items-center">
        <img src="src/assets/logo.png" alt="" />
        <span className="d-none d-lg-block">by between loads</span>
      </span>
    </div>
    {navBarComponent}
  </header>
);

export default Header;
