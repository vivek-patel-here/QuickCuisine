import { createContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";

export const storeContext = createContext();

const storeContextProvider = (props) => {
  let [cart, setCart] = useState({});
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [food_list, setFoodList] = useState([]);
  const url ='http://localhost:4000';

  const errMsg = (msg) => {
    return toast.error(msg, { autoClose: 1200, position: "top-center" });
  };

  const successMsg = (msg) => {
    return toast.success(msg, { autoClose: 1200, position: "top-center" });
  };

  async function addTocart(itemid) {
    let response = await fetch(`${url}/cart`,{
      method:'POST',
      headers:{
        'Content-Type' :'application/json',
        'authorization' :`${localStorage.getItem('token')}`
      },
      body:JSON.stringify({item_id:itemid})
    })
  
    let data =await response.json();
    if(!data.success){
      return errMsg("You are not logged in. Please log in to proceed.")
    }
    successMsg(data.message);
    if (!cart[itemid]) {
      setCart((prev) => {
        return { ...prev, [itemid]: 1 };
      });
    } else {
      setCart((prev) => {
        return { ...prev, [itemid]: prev[itemid] + 1 };
      });
    }
  }

  async function RemoveFromCart(itemid) {
    let response = await fetch(`${url}/cart`,{
      method:'DELETE',
      headers:{
        'Content-Type' :'application/json',
        'authorization' :`${localStorage.getItem('token')}`
      },
      body:JSON.stringify({item_id:itemid})
    })
  
    let data =await response.json();
    if(!data.success){
      return errMsg(data.message)
    }
    successMsg(data.message);
    setCart((prev) => {
      return { ...prev, [itemid]: prev[itemid] - 1 };
    });
  }

  function findTotal() {
    let total = 0;
    food_list.map((item) => {
      if (cart[item._id] > 0) {
        total += item.price * cart[item._id];
      }
    });
    return total;
  }


  useEffect(() => {
    async function loadData() {
      let response = await fetch(`${url}/food/all`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
  
      let data = await response.json();
      if (!data.success) {
        errMsg(data.message);
      } else {
        setFoodList(data.foodList);
      }

    }

    async function LoadCartData() {
      let response =await fetch(`${url}/cart`,{
        method:'GET',
        headers:{
          'Content-Type':"application/json",
          'authorization':`${localStorage.getItem('token')}`
        }
      })

      let data =await response.json();
      if(!data.success){
        return;
      }else{
        setCart(data.cartData);
      }
    }
    
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }

    loadData();
    LoadCartData();
  },[]);

  const contextValue = {
    food_list,
    assets,
    cart,
    setCart,
    addTocart,
    RemoveFromCart,
    findTotal,
    url,
    errMsg,
    successMsg,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default storeContextProvider;
