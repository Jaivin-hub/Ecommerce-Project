import React from 'react';
import './style.css'
import { FaUserCircle } from "react-icons/fa";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function AdminLogin() {
    return (
        <div className="main">
            <div className="row">

                <div className="signupfield mt-5">
                    <div className="maintext row">
                        <h1 className="text">YOUROWN</h1>
                    </div>
                    <div className="row">
                        <div className="other col-md-3"></div>
                        <div className="other col-md-3"></div>
                        <div className="other col-md-3"></div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="signuplabel text-center">
                                    <FaUserCircle />
                                    <small><strong>SIGNIN</strong></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line row">

                    </div>
                    <div className="pt-5">
                        <div className="row">
                            <div className="name mt-3">
                                <label className="pt-3 ps-4" htmlFor=""><small>Name</small></label>
                            </div>
                            <div className=" mt-3">
                                <input className="nameinput" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="name mt-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="pt-3 ps-4" htmlFor=""><small>Password</small></label>
                                    </div>
                                    {/* <div className="col-md-6 pt-3 ps-5">
                                            <small>Lost password</small>
                                        </div> */}
                                </div>

                            </div>

                            <div className=" mt-3">
                                <input className="nameinput" type="text" />
                            </div>
                        </div>
                        <div className="row text-center pt-3">
                            <small>Lost password</small>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="singupbutton">
                            <button className="signupbtn">Sign Up</button>
                        </div>
                    </div>
                    <div className="row text-center pt-4">
                        <small>Don't have an account yet? Sign Up!</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin;