import React, { useContext } from "react";
import "./Foodlist.css";
import { storeContext } from "../../context/StateContext";
import Foodcard from "../foodcard/Foodcard";

function Foodlist({ category }) {
  const { food_list}=useContext(storeContext);


  return (
    <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
      {category==="All"&&<div className="item-container">
        {food_list.map((item) => {
          return <Foodcard key={item._id} item={item}/>
        })}
      </div>}
      {
        category!=="All"&&<div className="item-container">
        {food_list.map((item) => {
          return item.category===category&&<Foodcard key={item._id} item={item}/>
        })}
      </div>}
    </div>
  );
}

export default Foodlist;
