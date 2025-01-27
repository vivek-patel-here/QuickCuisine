import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Exploremenu from "../../components/exploreMenu/Exploremenu";
import Foodlist from "../../components/foodList/Foodlist";
import Appdownload from "../../components/Appdownload/Appdownload";

function Home() {

  let [category,setCategory] =useState("All")

  return (
    <div className="Home">
      <Header />
      <Exploremenu category={category} setCategory={setCategory}/>
      <hr className="divider" />
      <Foodlist category={category}/>
      <Appdownload/>
    </div>
  );
}

export default Home;
