import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        <div className="flexColStart f-left">
          <img src="./logo.jpg" alt="" width={120} />

          <span className="secondaryText">
            Our vision is to make all the people
            <br />
            to sleep comfortly and peacefully.
          </span>
        </div>
        <div>
          <span className="primaryText">" Truly Cares for you "</span>
          <br />
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Our Info</span>
          {/* <span className="secondaryText">A,64 Main Street,Bangalore.</span> */}
          <span className="text-sm font-medium text-gray-700">Team 21, Virtusa</span>

          <div className="flexCenter f-menu">
            <span>Contact us:</span>
            <span className="text-blue-800">team21@gmail.com</span>
            
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;