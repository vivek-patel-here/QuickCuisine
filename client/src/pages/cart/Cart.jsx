import React, { useContext } from "react";
import "./Cart.css";
import { storeContext } from "../../context/StateContext.jsx";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { food_list, cart, RemoveFromCart, findTotal } =
    useContext(storeContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-header">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {/* order list here  */}
      {food_list.map((item, index) => {
        if (cart[item._id] > 0) {
          return (
            <>
              <div key={index} className="cart-item">
                <img src={item.image} />
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <p>{cart[item._id]}</p>
                <p>$ {item.price * cart[item._id]}</p>
                <p
                  onClick={() => {
                    RemoveFromCart(item._id);
                  }}
                  className="remove-from-cart"
                >
                  X
                </p>
              </div>
              <hr />
            </>
          );
        }
      })}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-subtotal">
            <p>Subtotal</p>
            <p>${findTotal()}/-</p>
          </div>
          <hr />
          <div className="delivery-fee">
            <p>Delivery Fee </p>
            <p>${2}/-</p>
          </div>
          <hr />
          <div className="total-amount">
            <p>
              <b>Total</b>
            </p>
            <p>
              <b>${findTotal() ? findTotal() + 2 : 0}/- (Tax inc.)</b>
            </p>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code , Enter it here</p>
            <form className="promo-input">
              <input type="text" placeholder="Promo code" />
              <button type="submit"> Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
