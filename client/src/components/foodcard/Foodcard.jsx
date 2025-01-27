import React, { useContext } from "react";
import "./Foodcard.css";
import { storeContext } from "../../context/StateContext.jsx";

function Foodcard({ item }) {
  let { assets,cart,addTocart,RemoveFromCart } = useContext(storeContext);

  return (
    <div className="Foodcard">
      <div className="img-container">
        <img src={item.image} className="bgimg" />
       {!cart[item._id]&& <img src={assets.add_icon_white} onClick={()=>addTocart(item._id)} className="add" />}
        {cart[item._id]?<div className="plus-minus">
          <img src={assets.remove_icon_red} className="minus" onClick={()=>RemoveFromCart(item._id)}/>
          <p>{cart[item._id]}</p>
          <img src={assets.add_icon_green} onClick={()=>addTocart(item._id)} className="plus" />

        </div>:null}
      </div>
      <div className="food-details">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-desc">{item.description}</p>
        <p className="price"> $ {item.price}</p>
      </div>
    </div>
  );
}

export default Foodcard;
