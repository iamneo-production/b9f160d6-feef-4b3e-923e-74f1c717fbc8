import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
/*import Registration from './Components/Registration'
import Login from "./Components/Login" */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Service from "./pages/Service";
import Navbar1 from "./NavComponents/Navbar1"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <App/>
);




