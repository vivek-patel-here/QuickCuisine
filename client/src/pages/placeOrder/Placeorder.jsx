import React, { useContext, useState } from "react";
import "./Placeorder.css";
import { storeContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

function Placeorder() {
  const navigate = useNavigate();
  const { findTotal, url, errMsg, successMsg, setCart } =
    useContext(storeContext);
  const [detail, setDetails] = useState({
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    PinCode: "",
    country: "",
    phoneNum: "",
  });

  const handleChange = (e) => {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: [e.target.value] };
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let response = await fetch(`${url}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderBy: `${detail.firstname.toString()} ${detail.lastname.toString()}`,
        amount: findTotal() + 2,
        address: `${detail.street.toString()} , ${detail.city.toString()}-${detail.PinCode.toString()},${detail.country.toString()}`,
        PhoneNum: `${detail.phoneNum.toString()}`,
      }),
    });

    let data = await response.json();
    if (!data.success) {
      return errMsg(data.message);
    }
    setCart({});

    let cashfree = await load({
      mode: "sandbox",
    });

    let checkoutOptions = {
      paymentSessionId: data.payment_session_id,
      redirectTarget: "_self",
    };
    console.log(cashfree);
    cashfree.checkout(checkoutOptions);

    successMsg(data.message);
  };

  return (
    <form onSubmit={placeOrder} className="order">
      <div className="delivery-info">
        <h1>Delivery Information</h1>
        <div className="input-feild-grp">
          <div className="multi-input">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={detail.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={detail.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Street and locality"
            name="street"
            value={detail.street}
            onChange={handleChange}
            required
          />
          <div className="multi-input">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={detail.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={detail.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="multi-input">
            <input
              type="number"
              placeholder="Pin code"
              name="PinCode"
              value={detail.PinCode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={detail.country}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="Number"
            placeholder="Phone e.g +91 99XXXXXXXX"
            name="phoneNum"
            min={9000000000}
            value={detail.phoneNum}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="cart-total">
        <h1>Cart Total</h1>

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
        <button>PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
}

export default Placeorder;
