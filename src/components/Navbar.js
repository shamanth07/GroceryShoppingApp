import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = ({ setCategory, toggleCart, setShowCart, handleLogout }) => {
  const handleCategoryClick = (category) => {
    setCategory(category);
    console.log('Category:', category);
    if (setShowCart) setShowCart(false); 
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="#" onClick={() => handleCategoryClick('fruits')}>Fruits</Link></li>
        <li className="nav-item"><Link to="#" onClick={() => handleCategoryClick('vegetables')}>Vegetables</Link></li>
        <li className="nav-item"><Link to="#" onClick={() => handleCategoryClick('flowers')}>Flowers</Link></li>
        <li className="nav-item"><Link to="#" onClick={() => handleCategoryClick('snacks')}>Snacks</Link></li>
        {toggleCart && (
          <li className="nav-item cart-icon">
            <Link to="#" onClick={toggleCart}>🛒</Link>
          </li>
        )}
        <li className="nav-item logout-button">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
