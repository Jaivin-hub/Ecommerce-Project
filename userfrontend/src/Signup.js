import React, { useState } from 'react';
import Footer from './Footer'
import './style.css'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'

function Signup() {

    let history = useHistory();

    // const [values, setValues] = useState({ firstname: '', lastname: '', email: '', phone: '', password: '' })

    // Input fields

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [retypepassword, setRetypepassword] = useState('')


    // Input fields ends

    // Err field

    const [firstnameerr, setFirstnameerr] = useState('')
    const [lastnameerr, setLastnameerr] = useState('')
    const [emailerr, setEmailerr] = useState('')
    const [phoneerr, setPhoneerr] = useState('')
    const [passworderr, setPassworderr] = useState('')
    const [retypepassworderr, setRetypepassworderr] = useState('')

    const [mainerr,setMainerr] = useState('')

    // Err field


    const firstnameHandler = (value) => {
        setFirstname(value)
        if (firstname.length > 2) {
            setFirstnameerr('')
            return true
        } else {
            setFirstnameerr('User name too short!')
            return false
        }
    }

    const lastnameHandler = (value) => {
        setLastname(value)
        if (lastname.length >= 1) {
            setLastnameerr('')
            return true
        } else {
            setLastnameerr('Enter properly')
            return false
        }
    }

    const emailHandler = (value) => {
        setEmail(value)
        if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setEmailerr('')
            return true
        } else {
            setEmailerr('Enter valid email address')
            return false
        }
    }

    const phoneHandler = (value) => {
        setPhone(value)
        if (phone.match(/^[0-9]*$/)) {
            setPhoneerr('')
            return true
        } else if (phone.length < 10) {
            setPhoneerr('Enter proper phone number')
            return false
        } else {
            setPhoneerr('Enter proper phone number')
            return false
        }
    }

    const passwordHandler = (value) => {
        setPassword(value)
        if (password.length >= 6) {
            setPassworderr('')
            return true
        } else {
            setPassworderr('Password is too short')
            return false
        }
    }

    const retypePasswordHandler = (value) => {
        setRetypepassword(value)
        if (retypepassword == password) {
            setRetypepassworderr('')
        } else {
            setRetypepassworderr('Incorrect password')
        }
    }




    const sndData = () => {

        if (firstnameHandler(firstname) && lastnameHandler(lastname) && emailHandler(email) && phoneHandler(phone) && passwordHandler(password)) {
            let data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                password: password,
                image:''
            }
            axios.post("http://localhost:3000/users", data).then((res) => {
                if (res.data.token) {
                    console.log(res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('username', res.data.firstname)
                    localStorage.setItem('lastname', res.data.lastname)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('phone', res.data.phone)
                    localStorage.setItem('id', res.data._id)

                history.push('/')
             

            }
              
            }).catch((err) => {
                console.log(err)
            })
        }else{
            setMainerr('Check all the inputs!')
        }
        console.log('function called..')

    }


    return (
        <div className="col-md-12">
            <div className="row text-center pt-5">
                <h3><strong>NEW ACCOUNT</strong></h3>
            </div>
            <div className="row pt-5">
                <p style={{ color: 'red' }} className="text-center">{mainerr}</p>
                <div className="col-md-6 pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label htmlFor="">First Name</label><br />
                                <input id="firstname" onInput={(e) => { firstnameHandler(e.target.value) }} value={firstname} className="signupInputs" type="text" />
                                <p className="err" style={{ color: 'red' }}>{firstnameerr}</p>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Email</label><br />
                                <input id="email" onInput={(e) => { emailHandler(e.target.value) }} value={email} className="signupInputs" type="text" />
                                <p className="err" style={{ color: 'red' }}>{emailerr}</p>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Password</label><br />
                                <input id="password" onInput={(e) => { passwordHandler(e.target.value) }} value={password} className="signupInputs" type="password" />
                                <p className="err" style={{ color: 'red' }}>{passworderr}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label htmlFor="">Last Name</label><br />
                                <input id="lastname" onInput={(e) => { lastnameHandler(e.target.value) }} value={lastname} className="signupInputs" type="text" />
                                <p className="err" style={{ color: 'red' }}>{lastnameerr}</p>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Phone</label><br />
                                <input id="phone" onInput={(e) => { phoneHandler(e.target.value) }} value={phone} className="signupInputs" type="number" />
                                <p className="err" style={{ color: 'red' }}>{phoneerr}</p>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Retype Password</label><br />
                                <input id="repass" onInput={(e) => { retypePasswordHandler(e.target.value) }} value={retypepassword} className="signupInputs" type="password" />
                                <p className="err" style={{ color: 'red' }}>{retypepassworderr}</p>
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </div>
            <div className="row text-center pt-5">
                <div className="createAccount pt-3">
                    <button onClick={sndData} className="btn">CREATE  ACCOUNT</button>
                </div>
            </div>
            <Footer />
        </div>








    )
}

export default Signup;