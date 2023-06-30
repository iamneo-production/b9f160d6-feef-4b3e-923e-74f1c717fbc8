import React from "react";
import { NavLink } from "react-router-dom";

const data = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Customers",
    href: "/customers",
  },
  {
    name: "Devices",
    href: "/devices",
  },
  {
    name: "Employees",
    href: "/employees",
  },
  {
    name: "Repairs",
    href: "/repairs",
  },
];

const Sidebar = () => {
  return (
    <section className="mt-20 w-64 h-screen fixed left-0 top-0 p-4 bg-slate-300 flex flex-col justify-between items-center">
      <ul className="text-lg flex flex-col items-start gap-8 font-semibold px-14 py-8">
        {data.map((e, i) => {
          return (
            <NavLink to={e.href} key={i}>
              <li className="cursor-pointer hover:text-cyan-600">
                {e.name}
              </li>
            </NavLink>
          );
        })}
      </ul>

      <button className="bg-blue-500 text-white my-32 px-6 py-2 rounded-3xl font-medium text-xl shadow-xl hover:scale-110 transition-all">
        Logout
      </button>
    </section>
  );
};

export default Sidebar;
