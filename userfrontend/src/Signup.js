import React from 'react';
import Footer from './Footer'
import './style.css'

function Signup() {
    return (
        <div className="col-md-12">
            <div className="row text-center pt-5">
                <h3><strong>NEW ACCOUNT</strong></h3>
            </div>
            <div className="row pt-5">
                <div className="col-md-6 pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label htmlFor="">First Name</label><br />
                                <input className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Email</label><br />
                                <input className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Password</label><br />
                                <input className="signupInputs" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label htmlFor="">Last Name</label><br />
                                <input className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Phone</label><br />
                                <input className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Retype Password</label><br />
                                <input className="signupInputs" type="text" />
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </div>
            <div className="row text-center pt-5">
                <div className="createAccount pt-3">
                    <button className="btn">CREATE ACCOUNT</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Signup;