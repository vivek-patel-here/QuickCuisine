import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import { assets } from "../../assets/frontend_assets/assets";
import { storeContext } from "../../context/StateContext";

function Myorder() {
  let [myorders, setMyorders] = useState([]);
  let { url, errMsg } = useContext(storeContext);
  async function fetchOrders() {
    let response = await fetch(`${url}/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        authorization: `${localStorage.getItem("token")}`,
      },
    });

    let data = await response.json();
    if (!data.success) {
      errMsg(data.message);
    } else {
      setMyorders(data.orders);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="myorders">
      <h1>My Orders</h1>
      {myorders.length === 0 ? (
        <p>No orders have been placed yet.!</p>
      ) : (
        myorders.map((order) => {
          return (
            <div className="item">
              <img src={assets.parcel_icon} />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <span key={index}>
                        {item.name} x {item.quantity}{" "}
                      </span>
                    );
                  } else {
                    return (
                      <span key={index}>
                        {item.name} x {item.quantity} ,{" "}
                      </span>
                    );
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>items : {order.items.length}</p>
              <li>{order.status}</li>
              <button onClick={fetchOrders} className="track-order-btn">
                Track order
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Myorder;
