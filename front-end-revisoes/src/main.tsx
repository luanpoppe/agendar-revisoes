import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalContext } from "./GlobalContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext>
      <Toaster />
      <App />
    </GlobalContext>
  </React.StrictMode>
);
