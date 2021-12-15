import React, { useState } from 'react';
import Footer from './Footer'
import './style.css'
import instance from './axios-orders'
import validator from 'simple-react-validator';
import { Link, useHistory } from 'react-router-dom'

function Signup() {

    // Email validation 

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    console.log(email)

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

    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState('')

    const phoneInputBlurHandler = (phone, setPhoneErr) => {
        if (phone === '') {
            setPhoneErr('This field cannot be empty!')
            return false
        } else if (phone.length < 10) {
            setPhoneErr('Phone number does not have 10 digits')
            return false
        } else if (phone.length > 10) {
            setPhoneErr('Phone number has more than 10 digits')
            return false
        } else {
            setPhoneErr('')
            return true
        }
    }

    const phoneInputChangeHandler = (phone, setPhoneErr) => {
        if (!phone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setPhoneErr("Enter numbers only!");
            return false
        } else if (phone.length > 10) {
            setPhoneErr('Phone number has more than 10 digits')
            return false
        }
        else {
            setPhoneErr('')
            return true
        }
    }

    //######################### Validating Password! ###########################

    //######################### Validating Password! ###########################

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')


    const passwordInputBlurHandler = (password, setPasswordErr) => {
        if (password === '') {
            setPasswordErr('This field cannot be empty!')
            return false
        } else if (password.length < 5) {
            setPasswordErr('password should have atleast 5 charecters')
            return false
        } else if (password.length > 20) {
            setPasswordErr('password should not exceed 20 characters')
            return false
        } else {
            setPasswordErr('')
            return true
        }
    }

    const passwordInputChangeHandler = (password, setPasswordErr) => {
        if (password.length > 20) {
            setPasswordErr('password should not exceed 20 characters')
            return false
        } else {
            setPasswordErr('')
            return true
        }
    }

    // #################### Validating Password! ###########################

    // #################### Validating Name! ###########################

    const [firstName, setFirstName] = useState('')
    const [firstNameErr, setFirstNameErr] = useState('')


    const nameInputBlurHandler = (firstName, setFirstNameErr) => {
        if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.length < 4) {
            setFirstNameErr('This field should have atleast 4 charecters.')
            return false
        } else if (firstName.slice(-1) === ' ') {
            setFirstNameErr('should not end with space.')
            return false
        } else {
            setFirstNameErr('')
            return true
        }
    }


    const nameInputChangeHandler = (firstName, setFirstNameErr) => {
        if (firstName.length === 0) {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.charAt(0) === ' ') {
            setFirstNameErr('should not start with space.')
            return false
        } else if (firstName.includes('  ')) {
            setFirstNameErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(firstName)) {
            setFirstNameErr('should not contain numbers.')
            return false
        } else if (!firstName.match(/^[a-zA-Z ]+$/)) {
            setFirstNameErr('Invalid charecter!')
            return false
        } else if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.length < 4) {
            setFirstNameErr('This field should have atleast 4 charecters.')
            return false
        } else if (firstName.slice(-1) === ' ') {
            setFirstNameErr('should not end with space.')
            return false
        } else {
            setFirstNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating LastName! ###########################

    const [lastName, setLastName] = useState('')
    const [lastNameErr, setLastNameErr] = useState('')


    const lastnameInputBlurHandler = (lastName, setLastNameErr) => {
        if (lastName === '') {
            setLastNameErr('This field cannot be empty!')
            return false
        } else if (lastName.slice(-1) === ' ') {
            setLastNameErr('should not end with space.')
            return false
        } else {
            setLastNameErr('')
            return true
        }
    }


    const lastnameInputChangeHandler = (lastName, setLastNameErr) => {
        if (lastName.length === 0) {
            setLastNameErr('This field cannot be empty!')
            return false
        } else if (lastName.charAt(0) === ' ') {
            setLastNameErr('should not start with space.')
            return false
        } else if (lastName.includes('  ')) {
            setLastNameErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(lastName)) {
            setLastNameErr('should not contain numbers.')
            return false
        } else if (!lastName.match(/^[a-zA-Z ]+$/)) {
            setLastNameErr('Invalid charecter!')
            return false
        } else if (lastName === '') {
            setLastNameErr('This field cannot be empty!')
            return false
        } else if (lastName.slice(-1) === ' ') {
            setLastNameErr('should not end with space.')
            return false
        } else {
            setLastNameErr('')
            return true
        }
    }

    // #################### Validating LastName! ###########################

    // #################### Validating RetypePassword! ###########################


    const [retypePassword, setRetypePassword] = useState('')
    const [retypePasswordErr, setRetypePasswordErr] = useState('')


    const RetypePasswordInputBlurHandler = (retypePassword, setRetypePasswordErr) => {
        if (retypePassword === '') {
            setRetypePasswordErr('This field cannot be empty!')
            return false
        } else if (retypePassword == password) {
            setRetypePasswordErr('')
            return true
        } else {
            setRetypePasswordErr('password not match!')
            return false
        }
    }

    const RetypePasswordInputChangeHandler = (retypePassword, setRetypePasswordErr) => {
        if (retypePassword == password) {
            setRetypePasswordErr('')
            return true
        } else {
            setRetypePasswordErr('password not match!')
            return false
        }
    }

    // #################### Validating RetypePassword! ###########################


    let history = useHistory();


    const sndData = () => {
        console.log('hhhhhhhkkkk')
        let data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            phone: phone,
            password: password,
            image: '',
            ActiveStatus: ''
        }
        console.log('data:', data)
        instance.post("/", data).then((res) => {
            if (res.data.token) {
                console.log(res.data)
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
    }


    return (
        <div className="col-md-12">
            <div className="row text-center pt-5">
                <h3><strong>NEW ACCOUNT</strong></h3>
            </div>
            <div className="row pt-5">
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label htmlFor="">First Name</label><br />
                                <input id="firstname"
                                    value={firstName}
                                    className="signupInputs"
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                        nameInputChangeHandler(e.target.value, setFirstNameErr)
                                    }}
                                    onBlur={(e) => {
                                        nameInputBlurHandler(e.target.value, setFirstNameErr)
                                    }}
                                />
                                <span className='text-danger fs-6'>
                                    {firstNameErr}
                                </span>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Email</label><br />
                                <input id="email"
                                    type='email'
                                    value={email}
                                    className="signupInputs"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        emailInputChangeHandler(e.target.value, setEmailError)
                                    }}
                                    onBlur={(e) => {
                                        emailInputBlurHandler(e.target.value, setEmailError)
                                    }}
                                />
                                <span className='text-danger fs-6'>
                                    {emailError}
                                </span>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Password</label><br />
                                <input id="password"
                                    className="signupInputs"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        passwordInputChangeHandler(e.target.value, setPasswordErr)
                                    }}
                                    onBlur={(e) => {
                                        passwordInputBlurHandler(e.target.value, setPasswordErr)
                                    }}
                                />
                                <span className='text-danger fs-6'>
                                    {passwordErr}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label htmlFor="">Last Name</label><br />
                                <input id="lastname"
                                    value={lastName}
                                    className="signupInputs"
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                        lastnameInputChangeHandler(e.target.value, setLastNameErr)
                                    }}
                                    onBlur={(e) => {
                                        lastnameInputBlurHandler(e.target.value, setLastNameErr)
                                    }}
                                />
                                <span className='text-danger fs-6'>
                                    {lastNameErr}
                                </span>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Phone</label><br />
                                <input id="phone"
                                    value={phone}
                                    className="signupInputs"
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                        phoneInputChangeHandler(e.target.value, setPhoneErr)
                                    }}

                                    onBlur={(e) => {
                                        phoneInputBlurHandler(e.target.value, setPhoneErr)
                                    }}

                                />
                                <span className='text-danger fs-6'>
                                    {phoneErr}
                                </span>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="">Retype Password</label><br />
                                <input id="repass"
                                    value={retypePassword}
                                    className="signupInputs"
                                    onChange={(e) => {
                                        setRetypePassword(e.target.value)
                                        RetypePasswordInputChangeHandler(e.target.value, setRetypePasswordErr)
                                    }}
                                    onBlur={(e) => {
                                        RetypePasswordInputBlurHandler(e.target.value, setRetypePasswordErr)
                                    }}
                                />
                                <span className='text-danger fs-6'>
                                    {retypePasswordErr}
                                </span>
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