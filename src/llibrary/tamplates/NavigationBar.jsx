import React from 'react';
import { Home, BookOpen, BarChart2, User } from 'lucide-react';
import '../static/css/NavigationBar.css';

const NavigationBar = () => {
  return (
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
  );
};

export default NavigationBar;

