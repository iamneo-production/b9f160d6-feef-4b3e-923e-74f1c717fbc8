import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import { TokenProvider } from "./utils/TokenContext";
const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenProvider decodedToken={decodedToken}>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);



