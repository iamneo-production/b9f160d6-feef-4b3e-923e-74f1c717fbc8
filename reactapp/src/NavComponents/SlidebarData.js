import React from "react";

import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome/>,
    cName: "nav-text"
  },
  {
    title: "Service",
    path: "/service",
    icon: <IoIcons.IoIosPaper/>,
    cName: "nav-text"
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <IoIcons.IoMdPeople/>,
    cName: "nav-text"
  },
  {
    title: "History",
    path: "/history",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text"
  }
];
