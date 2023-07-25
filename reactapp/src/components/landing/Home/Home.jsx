import React from "react";
import "./Home.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import logo from "./Logo.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-wrapper">
      <div className="paddings innerwidth flexCenter home-container">
        <div className="flexColStart home-left">
          <div className="home-title">
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
            >
              AC Service and Repair
            </motion.h1>
          </div>
          <div>
            <span className="secondaryText">
              <b>
                <i>Your choice for living</i>
              </b>
            </span>
          </div>
          <div className="flexColStart home-des">
            <span className="secondarytext">
              In the midst of summer's blaze, the humble AC stands as our
              faithful ally, bringing relief <br /> and restoring our inner
              equilibrium.
            </span>
          </div>

          <section className="w-[30rem] flex items-center justify-evenly">
            <div className="flexColCenter stat ">
              <span>
                <CountUp start={4500} end={5000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondarytext">Happy Customers</span>
            </div>
            <NavLink to="/register">
              <button className="bg-green-500 text-xl font-medium py-2 px-4 rounded-xl shadow shadow-white hover:bg-green-700 hover:scale-105  transition-all">
                Register now
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="bg-blue-500 text-xl font-medium py-2 px-4 rounded-xl shadow shadow-white hover:bg-blue-700 hover:scale-105  transition-all">
                Login
              </button>
            </NavLink>
          </section>
        </div>

        <div className="flexCenter home-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
            className="image-container"
          >
            <img src={logo} alt="Logo" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;