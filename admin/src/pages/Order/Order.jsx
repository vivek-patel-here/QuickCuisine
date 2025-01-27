import React from "react";
import "./Order.css";
import { useState } from "react";
import { assets } from "../../assets/assets.js";
import { useEffect } from "react";
function Order() {
  let [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    let response = await fetch("https://quickcuisineserver.onrender.com/order/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    if (!data.success) {
      return assets.ErrorMsg(data.message);
    }
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateInfo = async (event, orderId) => {
    let response = await fetch(`https://quickcuisineserver.onrender.com/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: orderId,
        status: [event.target.value].toString(),
      }),
    });

    let data = await response.json();
    if (!data.success) {
      return assets.ErrorMsg(data.message);
    }
    fetchOrders();
    assets.successMsg(data.message);
  };

  return (
    <div className="order">
      <h1>Order Page</h1>
      {orders.length===0&&<p>There are no orders yet!</p>}
      {orders.length!==0&&orders.map((order, index) => {
        return (
          order.items.length!==0 && <div className="item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div className="customer-details">
              <p className="order-list">
                <b>
                  {order.items.map((item, indx) => {
                    if (indx === order.items.length - 1) {
                      return (
                        <span key={indx}>
                          {item.name} x {item.quantity}
                        </span>
                      );
                    } else {
                      return (
                        <span key={indx}>
                          {item.name} x {item.quantity} ,
                        </span>
                      );
                    }
                  })}
                </b>
              </p>
              <div>
              <p>
                <b>{order.orderBy}</b>
              </p>
              <p>{order.address}</p>
              </div>
              <p>{order.PhoneNum}</p>
            </div>
            <p>items : {order.items.length}</p>
            <p>${order.amount}.00</p>
            <select
              name="status"
              value={order.status}
              onChange={(event) => {
                updateInfo(event, order._id);
              }}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        );
      })}
    </div>
  );
}

export default Order;
