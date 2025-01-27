import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Placeorder from "./pages/placeOrder/Placeorder.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Footer from "./components/footer/Footer.jsx";
import Login_signup from "./components/loginpopup/Login_signup.jsx";
import { useState } from "react";
import {ToastContainer} from 'react-toastify'
import Myorder from "./pages/Myorders/Myorder.jsx";
import Verify from "./pages/verify/Verify.jsx";
 
function App() {
  const [popup, setPopup] = useState(false);
 

  return (
    <>
      {popup && <Login_signup setPopup={setPopup} />}
      <div className="app">
        <Navbar setPopup={setPopup} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/myorders" element={<Myorder/>}/>
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </div>
      <Footer />
      <ToastContainer/>
    </>
  );
}

export default App;
