import Sidebar from "./Sidebar";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const SidebarShow = () => {
  const [show, setShow] = useState(false);

  return (
    <button
      className="fixed left-10 top-24 text-3xl cursor-pointer transition-all"
      onClick={() => setShow(!show)}
    >
      {show ? (
        <>
          <Sidebar />
        </>
      ) : (
        <RxHamburgerMenu className="transition-all duration-300" />
      )}
    </button>
  );
};

export default SidebarShow;
