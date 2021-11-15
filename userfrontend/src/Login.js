import React, { useState,useEffect } from 'react';
import Footer from './Footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import axios from "axios"
import { useForm } from 'react-hook-form'


function Login() {

    let history = useHistory();
    useEffect(()=>{

    },[])

    // Inputs fields

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [emailerr, setEmailerr] = useState('')
    const [passworderr, setPassworderr] = useState('')
    const [mainErr, setmainErr] = useState('')
    const [otpvalue,setotpvalue] = useState('')
    const [otp,setOtp] = useState()
    const [otpfield,setOtpfield] = useState(false)
    const [dataOtp,setDataotp] = useState('')
    const [allOtp,setallOtp] = useState('')
    const [show, setShow] = useState(false)

    const [display,setDisplay] = useState('')

    // Input fields ends

    const submitHandler = (e) => {
        console.log('infunction')
        e.preventDefault()

        if (inputemailHandler(email) && inputpasswordHandler(password)) {
            let data = {
                email: email,
                password: password,
            }
            axios.post("http://localhost:3000/users/checkusers", data).then((res) => {
                console.log('success')
                console.log(res)
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
        setShow(true)
    }

    const otpHandler=(e)=>{
        const newOtp={...otpvalue}
        newOtp[e.target.id] =e.target.value
        setotpvalue(newOtp)
        
    }

    const otpdataHandler=(e)=>{
        const newOtp = {...dataOtp}
        newOtp[e.target.id] = e.target.value
        setDataotp(newOtp)
    }

    const otpData = parseInt(otpvalue)

    console.log(otpvalue)

    const otpSubmitHandler=(e)=>{
        e.preventDefault()
        console.log('in otp function')
        axios.post("http://localhost:3000/users/getotp",otpvalue).then((res)=>{
            console.log('set')
            console.log(res.data.msg)
            if(res.data.msg=="Otp sended to number"){
                setDisplay('Otp sended to your number')
            }else{
                setDisplay('User Not Found')
            }
        })

    }

    const alldetails = {otpvalue,dataOtp}
    console.log('itis  ')
    console.log(alldetails)
    console.log(alldetails.dataOtp.otpdata)
    console.log(alldetails.otpvalue.otp)


    const setOtpHandler=(e)=>{
        console.log('get.....')
        axios.post("http://localhost:3000/users/otpadded",alldetails).then((res)=>{
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
                <div className="row pt-5">
                    <div className="col-md-6">

                        <div className="row pt-3">
                            <div className="col-md-6"></div>
                            <div className="col-md-6 pt-5">
                                <div className="row">
                                    <p className="err" style={{ color: 'red' }}>{display}</p>
                                </div>
                                {!show ?

                                    <form onSubmit={submitHandler}>
                                        <div className="pt-5">
                                            <label htmlFor="">Email</label>
                                        </div>
                                        <div>
                                            <input onInput={(e) => { inputemailHandler(e.target.value) }} value={email} id='email' className="userinputs" type="text" />
                                            <p className="err" style={{ color: 'red' }}>{emailerr}</p>
                                        </div>
                                        <div className="pt-4">
                                            <label htmlFor="">Password</label>
                                        </div>
                                        <div>
                                            <input onInput={(e) => { inputpasswordHandler(e.target.value) }} value={password} id='password' className="userinputs" type="password" />
                                            <p className="err" style={{ color: 'red' }}>{passworderr}</p>
                                        </div>
                                        <div className="pt-5">
                                            <button type="submit" className="btn"><strong>SIGN IN</strong></button>


                                            <button onClick={setInputs} style={{ marginLeft: "4%" }} className="btn"><strong>OTP Login</strong></button>
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
                                        <button onClick={()=>setOtpfield(true)} type="submit" className="btn"><strong>Get OTP</strong></button>
                                        <button style={{marginLeft:'4%'}} onClick={()=>setShow(false)}  type="submit" className="btn"><strong>Cancel</strong></button>
                                        
                                        </div>
                                        </form>
                                    </div>
                                }

                                {otpfield&&display=='Otp sended to your number'?
                                 <div>
                                 <form onSubmit={otpSubmitHandler}>
                                 <div className="pt-5">
                                     <label htmlFor="">Enter Otp</label>
                                 </div>
                                 <div>
                                     <input onChange={otpdataHandler} id='otpdata' className="userinputs" type="text" />
                                 </div>
                                 <div className="pt-5">
                                 <button style={{marginLeft:'0%'}} onClick={setOtpHandler}  type="submit" className="btn"><strong>Submit</strong></button>
                                 </div>
                                 </form>
                             </div>
                                :null}
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
                                        <button onClick={createAct} className="btn"><strong>CREATE ACCOUNT</strong></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default Login;