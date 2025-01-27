import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>
          Craving something delicious? Explore a wide variety of cuisines,
          browse your favorite restaurants, and enjoy freshly prepared meals
          delivered straight to your doorstep. Fast, reliable, and convenient –
          satisfying your hunger has never been this easy!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
