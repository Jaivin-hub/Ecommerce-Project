import React, { useState } from "react";
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FaUserCircle from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'

function Navbar() {

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="navbar">

                            <div className="col-md-6">

                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                <div className="col-md-4 text-end">
                                    <form class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button class="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className=" col-md-4 ">
                                            <IoMailSharp/>
                                            </div>
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <h1>ksdj</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <h1 className="text-light pt-4"><strong>YourOwn</strong></h1>
                        </li>
                        {SidebarData.map((items, key) => {
                            return (
                                <li key={key} className={items.cName}>
                                    <Link to={items.path}>
                                        {items.icon}
                                        <span>{items.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;