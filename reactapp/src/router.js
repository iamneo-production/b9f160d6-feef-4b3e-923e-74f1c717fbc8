import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Customers from "./pages/customers/index";
import CustomerID from "./pages/customers/[customerid]";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/customers",
    element: <Customers/>,
  },
  {
    path: "/customers/:customerid",
    element: <CustomerID/>,
  },
]);

export default router;