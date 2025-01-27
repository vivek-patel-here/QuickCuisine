import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Context from "./context/StateContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <HashRouter>
        <App />
      </HashRouter>
    </Context>
  </StrictMode>
);
