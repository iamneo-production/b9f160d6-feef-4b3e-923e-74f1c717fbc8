import React from "react";
import { FaUserAlt, FaBell, FaFan } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between fixed top-0 left-0 w-screen items-center px-6 py-3 bg-cyan-600 text-white h-20">
       <Link to="/"> 
        <h1 className="text-2xl font-medium flex gap-2 items-center">
          <FaFan className="text-orange-400" />
          AC Service Portal
        </h1>
      </Link>
      <nav className="flex justify-around items-center gap-12 p-2 text-2xl mx-6">
        <FaBell className="hover:scale-110 transition-all" />
        <FaUserAlt className="hover:scale-110 transition-all" />
      </nav>
    </header>
  );
};

export default Navbar;
