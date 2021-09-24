import React, { useState } from 'react';
import Footer from './Footer'
import './style.css'
import axios from 'axios'

function Signup() {

    const [values, setValues] = useState({ firstname: '', lastname: '', email: '', phone: '', password: '', repass: '' })

    let textChange = (e) => {
        const newValue = { ...values }
        newValue[e.target.id] = e.target.value
        setValues(newValue)
    }


    const sndData = () => {
        console.log('function called..')
        axios.post("http://localhost:3000/users", values).then((res) => {
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })

    }


    console.log(values)

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
                                <input id="firstname" onChange={textChange} className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Email</label><br />
                                <input id="email" onChange={textChange} className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Password</label><br />
                                <input id="password" onChange={textChange} className="signupInputs" type="password" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label htmlFor="">Last Name</label><br />
                                <input id="lastname" onChange={textChange} className="signupInputs" type="text" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Phone</label><br />
                                <input id="phone" onChange={textChange} className="signupInputs" type="number" />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Retype Password</label><br />
                                <input id="repass" onChange={textChange} className="signupInputs" type="password" />
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </div>
            <div className="row text-center pt-5">
                <div className="createAccount pt-3">
                    <button onClick={sndData} className="btn">CREATE ACCOUNT</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup;