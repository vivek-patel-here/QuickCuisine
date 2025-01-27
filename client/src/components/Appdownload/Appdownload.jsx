import React from "react";
import "./Appdownload.css";
import { assets } from "../../assets/frontend_assets/assets.js";

function Appdownload() {
  return (
    <div className="appdownload" id="appdownload">
      <p>
        For Better experience download <br />
        QuickCuisine App
      </p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
}

export default Appdownload;
