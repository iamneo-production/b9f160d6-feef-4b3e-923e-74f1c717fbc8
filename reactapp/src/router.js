import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Customers from "./pages/admin/customer/index";
import CustomerID from "./pages/admin/customer/[customerid]";
import Home from "./pages/admin/Home";
import Repairs from "./pages/admin/repair";
import RepairID from "./pages/admin/repair/[repairid]";
import Employees from "./pages/admin/employee";
import AddEmployee from "./pages/admin/employee/AddEmployee";
import EditEmployee from "./pages/admin/employee/[employeeid]";
import AddDevice from "./pages/admin/device/AddDevice";
import DeviceManagement from "./pages/admin/device";
import EditDevice from "./pages/admin/device/[deviceid]";
import AdminProfile from "./pages/admin/Profile";
import History from "./pages/customer/History";
import Service from "./pages/customer/Service";
import CustomerHome from "./pages/customer/Home";
import CustomerProfile from "./pages/customer/Profile";
import EmployeeHome from "./pages/employee/Home";
import EmployeeHistory from "./pages/employee/History";
import EmployeeTasks from "./pages/employee/Tasks";
import EmployeeProfile from "./pages/employee/Profile";
import Registration from "./pages/customer/Registration";
import Login from "./pages/customer/Login";
import TaskDetails from "./pages/employee/TaskDetails";
import Report from "./pages/customer/Report";

const ProtectedRoute = ({ roles, children }) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

  if (!decodedToken || !decodedToken.role) return <Navigate to="/Login" />;

  if (roles.includes(decodedToken.role)) return children;

  // if (decodedToken.role === "ADMIN") return <Navigate to="/admin/home" />;

  // if (decodedToken.role === "EMPLOYEE") return <Navigate to="/employee/home" />;

  // if (decodedToken.role === "CUSTOMER") return <Navigate to="/customer/home" />;

  return <Navigate to={`/${decodedToken.role.toLowerCase()}/home`} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/home",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/customers",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <Customers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/customers/:customerid",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <CustomerID />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/repairs",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <Repairs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/repairs/:repairid",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <RepairID />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/employees/add",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AddEmployee />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/employees",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <Employees />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/employees/:employeeid",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <EditEmployee />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/devices/add",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AddDevice />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/devices",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <DeviceManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/devices/:deviceid",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <EditDevice />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AdminProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/customer/history",
    element: (
      <ProtectedRoute roles={["CUSTOMER"]}>
        <History />
      </ProtectedRoute>
    ),
  },
  {
    path: "/customer/history/:repairid",
    element: (
      <ProtectedRoute roles={["CUSTOMER"]}>
        <Report />
      </ProtectedRoute>
    ),
  },
  {
    path: "/customer/service",
    element: (
      <ProtectedRoute roles={["CUSTOMER"]}>
        <Service />
      </ProtectedRoute>
    ),
  },
  {
    path: "/customer/home",
    element: (
      <ProtectedRoute roles={["CUSTOMER"]}>
        <CustomerHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/customer/profile",
    element: (
      <ProtectedRoute roles={["CUSTOMER"]}>
        <CustomerProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/home",
    element: (
      <ProtectedRoute roles={["EMPLOYEE"]}>
        <EmployeeHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/profile",
    element: (
      <ProtectedRoute roles={["EMPLOYEE"]}>
        <EmployeeProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/history",
    element: (
      <ProtectedRoute roles={["EMPLOYEE"]}>
        <EmployeeHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/tasks",
    element: (
      <ProtectedRoute roles={["EMPLOYEE"]}>
        <EmployeeTasks />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/tasks/:repairid",
    element: (
      <ProtectedRoute roles={["EMPLOYEE"]}>
        <TaskDetails />
      </ProtectedRoute>
    ),
  },
]);

export default router;