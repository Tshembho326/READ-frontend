import React from "react";
import { Home, BookOpen, BarChart2, User } from "lucide-react";
import "../static/css/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header>
      <div className="header-content">

        <h1>READ-TUTOR</h1>
      </div>
      <div>
      <nav className="navigation-bar">
        <div className="nav-item"> 
          <span onClick={() => handleNavigation('/home')}> <Home className="icon" /> Home </span>
        </div>
        <div className="nav-item"> 
          <span onClick={() => handleNavigation('/library')}> <BookOpen className="icon"  /> Library </span>
        </div>
        <div className="nav-item"> 
          <span onClick={() => handleNavigation('/progress')}> <BarChart2 className="icon"  /> Progress </span>
        </div>
        <div className="nav-item"> 
          <span onClick={() => handleNavigation('/profile')}> <User className="icon" /> Profile </span>
        </div>
      </nav>
      </div>
    </header>
  );
};

export default Header;
