import React from 'react';
import Footer from './Footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// import {Link,Router} from 'react-router-dom'

function Login() {
    return (
        <div>
            <div className="row text-center pt-5">
                <h3><strong>SIGN IN</strong></h3>
            </div>
            <div className="row pt-5">
                <div className="col-md-6">
                    <div className="row pt-3">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 pt-5">
                            <form action="">
                                <div className="pt-5">
                                    <label htmlFor="">Email</label>
                                </div>
                                <div>
                                    <input className="userinputs" type="text" />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor="">Password</label>
                                </div>
                                <div>
                                    <input className="userinputs" type="password" />
                                </div>
                                <div className="pt-5">
                                    <button className="btn"><strong>SIGN IN</strong></button>
                                    <Link>forget password?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="signupDetails">
                            <div className="row text-center pt-3">
                                <h6><strong>NEW CUSTOMER?</strong></h6>
                            </div>
                            <div className="row text-center">
                                <small>Create an account with us and you'll be <br /> able to:</small>
                            </div>
                            <div className="row pt-4">
                                <div className="list">
                                    <ul>
                                        <li><small>Check out faster</small></li>
                                        <li><small>Save multiple shipping <br /> addresses</small></li>
                                        <li><small>Access your order history</small></li>
                                        <li><small>Track new orders</small></li>
                                        <li><small>Save items to your Wish <br /> List</small></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row text-center pt-3">
                                <div>
                                    <Link to="/signup"><button className="btn"><strong>CREATE ACCOUNT</strong></button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;