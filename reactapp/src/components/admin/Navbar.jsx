import React, { useContext } from "react";
import { FaUserAlt, FaFan } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TokenContext } from "../../utils/TokenContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const routeStart = location.pathname.split("/")[1];

  const { decodedToken } = useContext(TokenContext);

  // const decodeToken = decodedToken? JSON.parse(localStorage.getItem("decodedToken")):null;

  let NavBgColor = "";
  if (routeStart === "admin") {
    NavBgColor = "bg-cyan-500";
  } else if (routeStart === "employee") {
    NavBgColor = "bg-[#B22727]";
  } else if (routeStart === "customer") {
    NavBgColor = "bg-[#008080]";
  }

  return (
    <header
      className={`flex justify-between fixed top-0 left-0 w-screen items-center px-6 py-3 ${NavBgColor} text-white h-20`}
    >
      <Link to={`${decodedToken?`/${decodedToken.role.toLowerCase()}/home`:"/"}`}>
        <h1 className="text-2xl font-medium flex gap-2 items-center">
          <FaFan className="text-orange-400" />
          AC Service Portal
        </h1>
      </Link>
      <nav className="flex justify-around items-center gap-12 p-2 text-2xl mx-6">
        <h3 className="font-medium no-underline bg-slate-100 rounded-xl text-black py-1 px-3 ">
          {decodedToken
            ? `Welcome ${decodedToken.name}`
            : ""}
        </h3>
        {decodedToken && decodedToken.role && (
          <NavLink to={`/${decodedToken.role.toLowerCase()}/profile`}>
            <FaUserAlt className="hover:scale-110 transition-all text-white" />
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
