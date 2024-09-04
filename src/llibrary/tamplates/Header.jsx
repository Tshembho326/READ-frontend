import React from "react";
import { Home, BookOpen, BarChart2, User } from "lucide-react";
import "../static/css/Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <button className="back-button">
          {/* Replace with back icon */}
          &lt;
        </button>
        <h1>READ-TUTOR</h1>
      </div>

      <div className="status-icons">
        <span className="icon">Signal</span>
        <span className="icon">Battery</span>
      </div>

      <nav className="navigation-bar">
        <div className="nav-item">
          <Home className="icon" />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <BookOpen className="icon" />
          <span>Library</span>
        </div>
        <div className="nav-item">
          <BarChart2 className="icon" />
          <span>Progress</span>
        </div>
        <div className="nav-item">
          <User className="icon" />
          <span>Profile</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
