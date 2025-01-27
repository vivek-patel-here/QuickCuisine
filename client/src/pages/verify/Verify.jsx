import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storeContext } from "../../context/StateContext";

function Verify() {
  const [searchparam, setSearchParam] = useSearchParams();
  const success = searchparam.get("success");
  const orderId = searchparam.get("orderId");
  const { errMsg, url, successMsg } = useContext(storeContext);
  const navigate = useNavigate();

  const paymentSuccess = async () => {
    if (success && success === "true") {
      let response = await fetch(`${url}/order/paymentsuccess`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderId }),
      });
      let data = await response.json();
      if (!data.success) {
        errMsg(data.message);
      }
      successMsg("Order paced successfully!")
      navigate("/myorders");
    }
    return;
  };

  useEffect(() => {
    paymentSuccess();
  }, []);


  return(
  <div className="verify">
    <div className="loader">
    </div>
  </div>);
}

export default Verify;
