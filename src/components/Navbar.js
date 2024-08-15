import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfileModal from './EditProfileModal';
import '../css/NavBar.css';

const NavBar = ({ toggleCart, handleLogout, isAdmin, setCategory, user, user_doc_id}) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
   const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <span className="app-name">E-Grocers</span>
        <div className={`nav-list ${showMenu ? 'show' : ''}`}>
          <a href="#!" onClick={() => handleCategoryChange('fruits')}>Fruits</a>
          <a href="#!" onClick={() => handleCategoryChange('vegetables')}>Vegetables</a>
          <a href="#!" onClick={() => handleCategoryChange('flowers')}>Flowers</a>
          <a href="#!" onClick={() => handleCategoryChange('snacks')}>Snacks</a>
          {!isAdmin && <Link to="#" onClick={toggleCart}>🛒</Link>}
          {!isAdmin && <button onClick={() => setShowEditProfile(true)}>Edit Profile</button>}
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="hamburger" onClick={handleMenuToggle}>
          &#9776;
        </div>
      </div>
{showEditProfile && <EditProfileModal user={user} user_id={user_doc_id} closeModal={() => setShowEditProfile(false)} />}
    </nav>
  );
};

export default NavBar;

