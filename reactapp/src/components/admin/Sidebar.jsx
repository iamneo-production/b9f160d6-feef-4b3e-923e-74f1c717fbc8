import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  let sidebarData = [];
  const navigate = useNavigate();
  const routeStart = location.pathname.split("/")[1];
  if (routeStart === "admin") {
    sidebarData = [
      {
        name: "Home",
        href: "/admin/home",
      },
      {
        name: "Customer",
        href: "/admin/customers",
      },
      {
        name: "Employee",
        href: "/admin/employees",
      },
      {
        name: "Device",
        href: "/admin/devices",
      },
      {
        name: "Repair",
        href: "/admin/repairs",
      },
    ];
  } else if (routeStart === "employee") {
    sidebarData = [
      {
        name: "Home",
        href: "/employee/home",
      },
      {
        name: "Tasks",
        href: "/employee/tasks",
      },
      {
        name: "History",
        href: "/employee/history",
      },
    ];
  } else if (routeStart === "customer") {
    sidebarData = [
      {
        name: "Home",
        href: "/customer/home",
      },
      {
        name: "Services",
        href: "/customer/service",
      },
      {
        name: "History",
        href: "/customer/history",
      },
    ];
  }

  let buttonBgColor = "";
  if (routeStart === "admin") {
    buttonBgColor = "bg-cyan-500";
  } else if (routeStart === "employee") {
    buttonBgColor = "bg-[#B22727]";
  } else if (routeStart === "customer") {
    buttonBgColor = "bg-[#008080]";
  }

  return (
    <section className="mt-20 w-64 h-screen fixed left-0 top-0 p-4 bg-slate-300 flex flex-col justify-between items-center">
      <ul className="text-lg flex flex-col items-start gap-8 font-semibold px-14 py-8">
        {sidebarData.map((e, i) => {
          return (
            <NavLink to={e.href} key={i}>
              <li className={`cursor-pointer hover:underline text-gray-800`}>
                {e.name}
              </li>
            </NavLink>
          );
        })}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("decodedToken");
          navigate("/");
          window.alert("Logged Out Successfully!!");
        }}
        className={`${buttonBgColor} text-white my-32 px-6 py-2 rounded-3xl font-medium text-xl shadow-xl hover:scale-110 transition-all`}
      >
        Logout
      </button>
    </section>
  );
};

export default Sidebar;
