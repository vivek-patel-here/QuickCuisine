import React from "react";
import { menu_list } from "../../assets/frontend_assets/assets.js";
import "./Exploremenu.css";

function Exploremenu({ category, setCategory } ) {
  return (
    <div className="exploremenu" id="exploremenu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craving and elevate your dining experience.
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCategory(()=>{
                  if(category===item.menu_name){
                    return "All";
                  }
                  return item.menu_name
                });
              }}
              className="list-item"
            >
              <img
                className={category===item.menu_name?"activeCategory":""}
                src={item.menu_image}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Exploremenu;
