import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import instance from './axios-orders'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useForm } from 'react-hook-form'


function Login() {

    const ClientId = process.env.REACT_APP_CLIENT_ID
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    let history = useHistory();
    useEffect(() => {

    }, [])

    // Google Authentication

    const onLoginSuccess = (res) => {
        const { givenName, email, familyName, imageUrl } = res.profileObj
        let data = {
            firstname: givenName,
            lastname: familyName,
            email: email,
            phone: '',
            password: password,
            image: imageUrl,
            ActiveStatus: ''
        }
        instance.post("/", data).then((res) => {
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username', res.data.firstname)
                localStorage.setItem('lastname', res.data.lastname)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('phone', res.data.phone)
                localStorage.setItem('id', res.data._id)
                history.push('/home')
            }
        }).catch((err) => {
            console.log(err)
        })
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    // Inputs fields


    const [password, setPassword] = useState('')
    const [emailerr, setEmailerr] = useState('')
    const [passworderr, setPassworderr] = useState('')
    const [mainErr, setmainErr] = useState('')
    const [otpvalue, setotpvalue] = useState('')
    const [otp, setOtp] = useState()
    const [otpfield, setOtpfield] = useState(false)
    const [dataOtp, setDataotp] = useState('')
    const [allOtp, setallOtp] = useState('')
    const [show, setShow] = useState(false)
    const [display, setDisplay] = useState('')

    // Input fields ends

    const submitHandler = (e) => {
        e.preventDefault()

        if (inputemailHandler(email) && inputpasswordHandler(password)) {
            let data = {
                email: email,
                password: password,
            }
            instance.post("/checkusers", data).then((res) => {
                if (res.data == 'user not found') {
                    setmainErr('User not found!')
                } else {
                    setmainErr('')
                    history.push("/cart");
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('username', res.data.firstname)
                    localStorage.setItem('lastname', res.data.lastname)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('phone', res.data.phone)
                    localStorage.setItem('id', res.data._id)
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            setmainErr('Incorrect email and password!')
        }
    }

    const inputemailHandler = (value) => {
        setEmail(value)
        if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setEmailerr('')
            return true
        } else {
            setEmailerr('Enter valid email address')
            return false
        }
    }

    const inputpasswordHandler = (value) => {
        setPassword(value)
        if (password.length > 4) {
            setPassworderr('')
            return true
        } else {
            setPassworderr('Password is too short')
            return false
        }
    }

    const createAct = () => {
        history.push("/signup");
    }

    const setInputs = () => {
        setmainErr('')
        setShow(true)
    }

    const otpHandler = (e) => {
        const newOtp = { ...otpvalue }
        newOtp[e.target.id] = e.target.value
        setotpvalue(newOtp)
    }

    const otpdataHandler = (e) => {
        const newOtp = { ...dataOtp }
        newOtp[e.target.id] = e.target.value
        setDataotp(newOtp)
    }

    const otpData = parseInt(otpvalue)

    console.log(otpData)

    const otpSubmitHandler = (e) => {
        e.preventDefault()
        console.log('in otp function')
        instance.post("/getotp", otpvalue).then((res) => {
            console.log('set ayyii ellammm')
            console.log('res-msg---', res.data.msg)
            if (res.data.msg == "Otp sended to number") {
                console.log('if case..')
                setDisplay('Otp sended to your number')
            } else {
                setDisplay('User Not Found')
            }
        })
    }


    // Email validation 

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const emailInputBlurHandler = (email, setError) => {
        if (email === '') {
            setError('This field cannot be empty!')
            return false
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setError('This email id is not valid.')
            return false
        } else {
            setError('')
            return true
        }
    }
    const emailInputChangeHandler = (email, setError) => {
        if (email.includes(' ')) {
            setError('Email id should not contain space.')
            return false
        }
        else {
            setError('')
            return true
        }
    }

    //######################### Validating phone number! ###########################


    console.log('display...', display)
    const alldetails = { otpvalue, dataOtp }
    console.log('itis  ')
    console.log(alldetails)
    console.log(alldetails.dataOtp.otpdata)
    console.log(alldetails.otpvalue.otp)


    const setOtpHandler = (e) => {
        console.log('get.....')
        instance.post("/otpadded", alldetails).then((res) => {
            console.log('set')
            // if(res.data.msg){
            //     setDisplay('Error OTP')
            // }else{
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.firstname)
            localStorage.setItem('lastname', res.data.lastname)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('phone', res.data.phone)
            localStorage.setItem('id', res.data._id)
            history.push("/");
            // }
        })
    }


    return (
        < Router>
            <div>
                <div className="row text-center pt-5">
                    <h3><strong>SIGN IN</strong></h3>
                </div>
                <div className="row ">
                    <div className="col-md-6 col-12">

                        <div className="row ">
                            <div className="col-md-6 "></div>
                            <div className="col-md-6 col-12">
                                <div className="row">
                                    <p className="err" style={{ color: 'red' }}>{display}</p>
                                    <p className="err" style={{ color: 'red' }}>{mainErr}</p>
                                </div>
                                {!show ?

                                    <form onSubmit={submitHandler}>
                                        <div className="pt-5">
                                            <label htmlFor="">Email</label>
                                        </div>
                                        <div>
                                            <input
                                                className="userinputs"
                                                //     onInput={(e) => {
                                                //         inputemailHandler(e.target.value)
                                                //     }}
                                                //     value={email} id='email'
                                                //     type="text" />
                                                // <p className="err" style={{ color: 'red' }}>{emailerr}</p>
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                    emailInputChangeHandler(e.target.value, setEmailError)
                                                }}
                                                onBlur={(e) => {
                                                    emailInputBlurHandler(e.target.value, setEmailError)
                                                }}
                                            />
                                            <br />
                                            <span className='text-danger fs-6'>
                                                <small>{emailError}</small>
                                            </span>
                                        </div>
                                        <div className="pt-4">
                                            <label htmlFor="">Password</label>
                                        </div>
                                        <div>
                                            <input onInput={(e) => { inputpasswordHandler(e.target.value) }} value={password} id='password' className="userinputs" type="password" />
                                            <p className="err" style={{ color: 'red' }}>{passworderr}</p>
                                        </div>
                                        <div className="row pt-5">
                                            <div className="col-4">

                                                <button type="submit" className="btn"><strong>SIGN IN</strong></button>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                {showloginButton ?
                                                    <GoogleLogin
                                                        clientId={ClientId}
                                                        buttonText="Sign In"
                                                        onSuccess={onLoginSuccess}
                                                        onFailure={onLoginFailure}
                                                        cookiePolicy={'single_host_origin'}
                                                        isSignedIn={true}
                                                    /> : null}

                                                {showlogoutButton ?
                                                    <GoogleLogout
                                                        clientId={ClientId}
                                                        buttonText="Sign Out"
                                                        onLogoutSuccess={onSignoutSuccess}
                                                    >
                                                    </GoogleLogout> : null
                                                }
                                            </div>
                                            <div className="col-4">

                                                <button onClick={setInputs} style={{ marginLeft: "4%" }} className="btn"><strong>OTP Login</strong></button>
                                            </div>

                                            {/* <div className="pt-5">


                                        </div> */}
                                        </div>
                                    </form>
                                    :
                                    <div>
                                        <form onSubmit={otpSubmitHandler}>
                                            <div className="pt-5">
                                                <label htmlFor="">Enter Phone Number</label>
                                            </div>
                                            <div>
                                                <input onChange={otpHandler} id='otp' className="userinputs" type="text" />
                                                {/* <p className="err" style={{ color: 'red' }}>{emailerr}</p> */}
                                            </div>
                                            <div className="pt-5">
                                                <button type="submit" className="btn"><strong>Get OTP</strong></button>
                                                <button style={{ marginLeft: '4%' }} onClick={() => setShow(false)} type="submit" className="btn"><strong>Cancel</strong></button>

                                            </div>
                                        </form>
                                    </div>
                                    // onClick={()=>setOtpfield(true)}
                                }
                                {display == 'Otp sended to your number' ?
                                    <div>
                                        <form onSubmit={otpSubmitHandler}>
                                            <div className="pt-5">
                                                <label htmlFor="">Enter Otp</label>
                                            </div>
                                            <div>
                                                <input onChange={otpdataHandler} id='otpdata' className="userinputs" type="text" />
                                            </div>
                                            <div className="pt-5">
                                                <button style={{ marginLeft: '0%' }} onClick={setOtpHandler} type="submit" className="btn"><strong>Submit</strong></button>
                                            </div>
                                        </form>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row ">
                            {/* <div className="col-12"> */}

                            <div className="signupDetails" >
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
                                        <button onClick={createAct} className="btn"><strong>CREATE ACCOUNT</strong></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default Login;