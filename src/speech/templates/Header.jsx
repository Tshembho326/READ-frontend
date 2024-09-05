import React from "react";
import { Home, BookOpen, BarChart2, User } from "lucide-react";
import "../static/css/Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-content">

        <h1>READ-TUTOR</h1>
      </div>
      <div>
      <nav className="navigation-bar">
        <div className="nav-item">
          <span> <Home className="icon" /> Home </span>
        </div>
        <div className="nav-item">
          <span> <BookOpen className="icon" /> Library </span>
        </div>
        <div className="nav-item">
          <span> <BarChart2 className="icon" /> Progress </span>
        </div>
        <div className="nav-item">
          <span> <User className="icon" /> Profile </span>
        </div>
      </nav>
      </div>
    </header>
  );
};

export default Header;
