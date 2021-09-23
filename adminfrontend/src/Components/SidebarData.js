import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { FaUsers } from "react-icons/fa";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
    },
    {
        title: "All Products",
        path: "/allproducts",
        icon: <FaIcons.FaCartPlus />,
        cName: "nav-text",
    },
    {
        title: "Users",
        path: "/users",
        icon: <FaUsers />,
        cName: "nav-text",
    }
]

