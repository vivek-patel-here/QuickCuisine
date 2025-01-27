import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import Order from "./pages/Order/Order.jsx";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/add" />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
      <ToastContainer/>

    </>
  );
}

export default App;
