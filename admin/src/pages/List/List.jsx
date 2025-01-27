import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { assets } from "../../assets/assets.js";

function List() {
  const url = "https://quickcuisineserver.onrender.com";
  const [list, setList] = useState([]);

  //method to fetch listings from the database
  const getListings = async () => {
    const response = await axios.get(`${url}/food/all`);
    if (!response.data.success) {
      return assets.ErrorMsg(response.data.message);
    }
    setList(response.data.foodList);
    assets.successMsg(response.data.message);
  };

  //method to remove a specific listing
  const removeFoodlisting = async (id) => {
    let response = await axios.delete(
      `${url}/food`,
     {data:{
      id
     }}
    );
    if(!response.data.success){
      assets.ErrorMsg(response.data.message)
    }

    setList((prevList)=>{
      return prevList.filter((listing)=>listing._id!==id)
    })

    assets.successMsg(response.data.message)
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className="list">
      <div className="list-header">
        <p>Item</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      {list.length==0&&<p>No listing yet</p>}
      {list.length!==0 &&
        list.map((listing) => {
          return (
            <div key={listing._id} className="list-content">
              <img src={listing.image} />
              <p>{listing.name}</p>
              <p>{listing.category}</p>
              <p>{listing.price}</p>
              <p
                className="cursor"
                onClick={() => {
                  removeFoodlisting(listing._id);
                }}
              >
                X
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default List;
