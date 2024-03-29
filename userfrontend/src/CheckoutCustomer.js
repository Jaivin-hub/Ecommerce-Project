
import React, { useState, useEffect } from 'react'
import instance from './axios-orders'
import PayPal from './PayPal'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import Footer from './Footer'
import { useHistory } from "react-router-dom"



function CheckoutCustomer() {

    let Uname = localStorage.getItem('username')
    let history = useHistory();

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('id')
    let username = localStorage.getItem('username')
    const [details, setDetails] = useState([])
    const [coupon, setCoupon] = useState()
    const [div, setDiv] = useState(true)
    const [next, setNext] = useState(true)
    const [open, setOpen] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [checkout, setCheckout] = useState(false)
    const [addressId, setAddressId] = useState('')
    const [userAddress, setUserAddress] = useState([])
    const [granttotal, setGranttotal] = useState()
    const [deleteAddress, setDeleteAddress] = useState(false)
    // rasorpay 

    function loadScript(src) {
        console.log('2-step')
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                console.log('3-step')
                resolve(true);
            };
            script.onerror = () => {
                console.log('4-step')
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        console.log('1-step')
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js",
            "https://checkout.razorpay.com/v1/payment-button.js"
        );



        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await instance.post("/orders", { total: granttotal });
        console.log(result.data);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;
        console.log('hhh')
        const payment = 'razorpay'
        const total = Math.floor(amount / 100)
        const totalDetails = { total, userId, payment, addressId }

        const options = {
            key: "rzp_test_9DCRDXICx0vZ5R", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: Uname,
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                console.log('here is the razorpay/')
                console.log(response.data);
                console.log('suceess')

                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                console.log('data', data)

                const result = await instance.post("/success", totalDetails);
                if (result.data.msg == true) {
                    history.push("/orderplaced");
                }
            },

        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }



    //end

    const [allAddress, setAllAddress] = useState(false)



    useEffect(() => {
        getCart()
        getAddress()
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    }, [deleteAddress, allAddress])





    const firstStep = () => {

        //work//
        setDiv(false)
    }

    console.log('address section')
    console.log(addressId)

    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [companyname, setCompanyname] = useState()
    const [addressline1, setAddressline1] = useState()
    const [addressline2, setAddressline2] = useState()
    const [cityname, setcityname] = useState()
    const [statename, setStatename] = useState()
    const [postcode, setPostcode] = useState()
    const [phone, setPhone] = useState()

    //error messages

    const [firstnameErr, setFirstnameErr] = useState("")
    const [lastnameErr, setLastnameErr] = useState("")
    const [companynameErr, setCompanynameErr] = useState("")
    const [addressline1Err, setAddressline1Err] = useState("")
    const [addressline2Err, setAddressline2Err] = useState("")
    const [citynameErr, setcitynameErr] = useState("")
    const [statenameErr, setStatenameErr] = useState("")
    const [postcodeErr, setPostcodeErr] = useState("")
    const [phoneErr, setPhoneErr] = useState("")
    const [review, setReview] = useState()
    const [addAddress, SetAddAddress] = useState(false)

    const getCart = () => {
        instance.get(`/getcart/${userId}`).then((res) => {
            const newdetails = res.data
            const values = newdetails.response
            console.log('all set')
            setDetails(values.products)
            setGranttotal(newdetails.grantTotal)
        })
    }

    const getAddress = () => {
        console.log('data-----')
        instance.get(`/getAllAddress/${userId}`).then((res) => {
            console.log('res data' + res)
            setUserAddress(res.data)
        })
    }


    // const getcart = () => {
    //     console.log('function activated');
    //     axios.get(`http://localhost:3000/users/getcart/${Userid}`).then((res) => {
    //         const newdetails = res.data
    //         // console.log(newdetails.grantTotal)
    //         // console.log(newdetails.response.products)
    //         // const values = newdetails.response
    //         // console.log(values.products)
    //         setDetails(newdetails.response.products)
    //         // console.log('ooooo'+ res.data)
    //         setGranttotal(newdetails.grantTotal)
    //     })
    // }




    const companynameHandler = (value) => {
        setCompanyname(value)
    }

    const addressline2Handler = (value) => {
        setAddressline2(value)
    }

    const citynameHandler = (value) => {
        setcityname(value)
    }

    const statenameHandler = (value) => {
        setStatename(value)
    }

    const billingSubmitHandler = (e) => {
        e.preventDefault()
        console.log('continue');
        let Data = {
            firstname: firstName,
            lastname: lastName,
            companyname: companyname,
            addressline1: addressOne,
            addressline2: addressline2,
            cityname: cityname,
            statename: statename,
            postcode: postCode,
            phone: phoneNumber,
            userid: userId
        }
        console.log('all data address :', Data)

        instance.post("/userdetails", Data).then((res) => {
            console.log('success')

        })


        SetAddAddress(false)

        console.log(Data)

    }

    const couponHandler = (e) => {
        const coupenData = { ...coupon }
        coupenData[e.target.id] = e.target.value
        setCoupon(coupenData)
    }

    const [coupenPreview, setCoupenPreview] = useState('')

    const sendCouponHandler = (e) => {
        e.preventDefault()
        let name = coupon.couponcode
        let totalAmount = granttotal
        let data = { name, totalAmount, userId }

        instance.post("/coupenentered", data).then((res) => {
            console.log('success')
            console.log(res.data)
            if (res.data == "Coupen already used") {
                setCoupenPreview(res.data)
            } else if (res.data == 'Invalid coupon') {
                setCoupenPreview(res.data)
            } else {
                setGranttotal(res.data)
                setCoupenPreview('Coupon applied')
            }
        })
    }

    const [razorpay, setRazorpay] = useState(false)
    console.log(coupon)


    const AddressDeleteHandler = (id) => {
        setDeleteAddress(!deleteAddress)
        console.log(id)
        const data = { id, userId }
        console.log('action')
        instance.post(`/deleteAddress`, data).then((res) => {
        })
    }

    const placeOrder = () => {
        const payment = 'COD'
        console.log('cod')
        console.log(granttotal)
        const total = granttotal
        const details = { total, userId, addressId, payment }
        instance.post(`/orderplaced`, details).then((res) => {
            console.log('Order placed')
            if (res) {
                history.push("/orderplaced");
            }
        })
    }

    const logOutHandler = () => {
        setDiv(true)
        localStorage.clear();
    }

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

    // #################### Validating Name! ###########################

    const [firstName, setFirstName] = useState('')
    const [firstNameErr, setFirstNameErr] = useState('')


    const nameInputBlurHandler = (firstName, setFirstNameErr) => {
        if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.length < 2) {
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
        } else if (firstName.length < 2) {
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

    // #################### Validating Address or similar stuff! ###########################

    const [addressOne, setAddressOne] = useState('')
    const [addressOneErr, setAddressOneErr] = useState('')

    const addressInputBlurHandler = (value, setError) => {
        if (value === '') {
            setError('This field cannot be empty!')
        } else if (value.length < 4) {
            setError('This field should have atleast 4 charecters.')
        } else if (value.slice(-1) === ' ') {
            setError('This field should not end with space.')
        } else {
            setError('')
        }
    }


    const addressInputChangeHandler = (value, setError) => {
        if (value.length === 0) {
            setError('')
        } else if (value.charAt(0) === ' ') {
            setError('should not start with space.')
        } else if (value.length < 4) {
            setError('This field should have atleast 4 charecters.')
        } else if (value.includes('  ')) {
            setError('should not contain consecutive spaces.')
        } else if (value.slice(-1) === ' ') {
            setError('This field should not end with space.')
        } else {
            setError('')
        }
    }

    //######################### Validating Postal Code! ###########################

    const [postCode, setPostCode] = useState('')
    const [postCodeErr, setPostCodeErr] = useState('')


    const postalCodeInputBlurHandler = (postCode, setError) => {
        if (postCode === '') {
            setError('This field cannot be empty!')
        } else if (postCode && postCode.length !== 6) {
            setError('Postal Code should have 6 digits')
        } else {
            setError('')
        }
    }

    const postalCodeInputChangeHandler = (postCode, setError) => {
        if (postCode === '') {
            setError('This field cannot be empty!')
        } else if (!postCode.match(/^[0-9]*$/g) && postCode !== '') {
            setError('Enter numbers only!')
        } else if (postCode && postCode.length > 6) {
            setError('postalCode should not have more than 6 digits')
        } else {
            setError('')
        }
    }

    //######################### Validating phone number! ###########################

    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberErr, setPhoneNumberErr] = useState('')

    const phoneInputBlurHandler = (phone, setError) => {
        if (phone === '') {
            setError('This field cannot be empty!')
        } else if (phone.length < 10) {
            setError('Phone number does not have 10 digits')
        } else if (phone.length > 10) {
            setError('Phone number has more than 10 digits')
        } else {
            setError('')
        }
    }

    const phoneInputChangeHandler = (phone, setError) => {

        if (!phone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setError("Enter numbers only!");
        } else if (phone.length > 10) {
            setError('Phone number has more than 10 digits')
        }
        else {
            setError('')
        }
    }



    const [firstConfirmation, setFirstConfirmation] = useState(false)
    const [secondConfirmation, setSecondConfirmation] = useState(false)
    const [thirdConfirmation, setThirdConfirmation] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState('')


    const SelectedAddressHandler = (id) => {
        setAddressId(id)
        setOpenPayment(true)
        setFirstConfirmation(true)
    }

    const termsAndConditions = () => {
        setThirdConfirmation(true)
    }

    const showError = () => {
        setErrorMsg('Select all required fields')
    }

    const buttonHandler = () => {
        setCheckout(false)
        setRazorpay(false)
        setSecondConfirmation(true)
    }

    const paybtn = () => {
        setCheckout(true)
        setRazorpay(false)
        setSecondConfirmation(true)
    }

    const razBtn = () => {
        setCheckout(false)
        setRazorpay(true)
        setSecondConfirmation(true)
    }


    console.log(details)
    const props = { granttotal, addressId }


    const UserName = username

    return (
        <div className="col-md-12">
            <div className="container">
                <div className="row pt-5 ps-5">
                    <div className="col-md-6 ">
                        <div className="row">
                            {token ?
                                <div className="row">
                                    <div className="col-md-8 col-8">
                                        <div className="row">
                                            <h3><strong>CUSTOMER</strong></h3>
                                            <small><strong>{UserName}</strong></small>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-end col-4">
                                        <div className="signoutbtn pt-1">
                                            <button onClick={logOutHandler} className="btn">LOG OUT</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <div className="col-md-8 col-8">
                                            <h3><strong>CUSTOMER</strong></h3>
                                            <small>Don’t have an account? Create an account to continue.</small>
                                        </div>
                                    </div>
                                    <div className="stepone">
                                        <div className="loginbox pt-3">
                                            <label htmlFor="">Email</label><br />
                                            <input
                                                className="logininp"
                                                type="email"
                                                value={email}
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
                                        <div className="loginbox pt-3">
                                            <label htmlFor="">Password</label><br />
                                            <input className="logininp" type="password" /><br />
                                        </div>
                                        <div className="pt-2">
                                            <small>Forgot password?</small>
                                        </div>
                                        <div className="mt-3">
                                            <button onClick={firstStep} className="btn">SIGN IN</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <hr />
                        <div className="row">
                            <div className="row">
                                <div className="col-md-4 col-6">
                                    <div className="billing">
                                        <h3><strong>BILLING</strong></h3>
                                    </div>
                                </div>
                                <div className="col-md-8 ">
                                    <div className="row">
                                        {allAddress ?
                                            <div className="col-md-6 pt-1 col-6">
                                                <button onClick={() => setAllAddress(!allAddress)} className="btn">
                                                    Cancel
                                                </button>
                                            </div>
                                            :
                                            <div className="col-md-6  pt-1 col-6">
                                                <button onClick={() => setAllAddress(!allAddress)} className="btn">
                                                    Select Address
                                                </button>
                                            </div>
                                        }
                                        <div className="col-md-6 text-end pt-1 col-6">
                                            <button onClick={() => { SetAddAddress(true) }} className="btn">Add Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {addAddress ?
                                <div className="row mt-3">
                                    <form onSubmit={billingSubmitHandler}>
                                        <div className="row col-12">
                                            <div className="col-md-6">
                                                <div className="addressdetails">
                                                    <label className="pt-3" htmlFor="">First Name</label><br />
                                                    <input
                                                        type="text"
                                                        className="countryinp"
                                                        value={firstName}
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
                                            </div>

                                            <div className="col-md-6">
                                                <div className="addressdetails">
                                                    <label className="pt-3 " htmlFor="">Last Name</label><br />
                                                    <input
                                                        value={lastName}
                                                        className="countryinp"
                                                        type="text"
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
                                            </div>
                                            <div className="addressdetails">
                                                <label className="pt-3" htmlFor="">Company Name (Optional)</label><br />
                                                <input onInput={(e) => { companynameHandler(e.target.value) }} value={companyname} className="countryinp" type="text" />
                                                <p className="err" style={{ color: 'red' }}>{companynameErr}</p>
                                            </div>
                                            <div className="addressdetails">
                                                <label className="pt-3" htmlFor="">Address Line 1</label><br />
                                                <input style={{ width: '100%' }}
                                                    onChange={(e) => {
                                                        setAddressOne(e.target.value);
                                                        addressInputChangeHandler(e.target.value, setAddressOneErr)
                                                    }}
                                                    onBlur={(e) => {
                                                        addressInputBlurHandler(e.target.value, setAddressOneErr)
                                                    }}
                                                    value={addressOne}
                                                    className="countryinp"
                                                    type="text" />
                                                <span className='text-danger fs-6'>
                                                    {addressOneErr}
                                                </span>
                                            </div>
                                            <div className="addressdetails">
                                                <label className="pt-3" htmlFor="">Address Line 2 (Optional)</label><br />
                                                <input onInput={(e) => { addressline2Handler(e.target.value) }} value={addressline2} className="countryinp" type="text" />
                                                <p className="err" style={{ color: 'red' }}>{addressline2Err}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="addressdetails">
                                                    <label className="pt-3" htmlFor="">City</label><br />
                                                    <input onInput={(e) => { citynameHandler(e.target.value) }} value={cityname} className="countryinp" type="text" />
                                                    <p className="err" style={{ color: 'red' }}>{citynameErr}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="addressdetails">
                                                    <label className="pt-3" htmlFor="">State/Province (Optional)</label><br />
                                                    <input onInput={(e) => { statenameHandler(e.target.value) }} value={statename} className="countryinp" type="text" />
                                                    <p className="err" style={{ color: 'red' }}>{statenameErr}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="addressdetails">
                                                    <label className="pt-3" htmlFor="">Postal Code</label><br />
                                                    <input
                                                        value={postCode}
                                                        onChange={(e) => {
                                                            setPostCode(e.target.value)
                                                            postalCodeInputChangeHandler(e.target.value, setPostCodeErr)
                                                        }}

                                                        onBlur={(e) => {
                                                            postalCodeInputBlurHandler(e.target.value, setPostCodeErr)
                                                        }}
                                                        className="countryinp"
                                                        type="number" />
                                                    <span className='text-danger fs-6'>
                                                        {postCodeErr}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="addressdetails">
                                                    <label className="pt-3" htmlFor="">Phone Number</label><br />
                                                    <input
                                                        value={phoneNumber}
                                                        className="countryinp"
                                                        type="text"
                                                        onChange={(e) => {
                                                            setPhoneNumber(e.target.value)
                                                            phoneInputChangeHandler(e.target.value, setPhoneNumberErr)
                                                        }}

                                                        onBlur={(e) => {
                                                            phoneInputBlurHandler(e.target.value, setPhoneNumberErr)
                                                        }}
                                                    />
                                                    <span className='text-danger fs-6'>
                                                        {phoneNumberErr}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-3 ms-1">
                                            <div className="continue">
                                                <button type='submit' className="btn">CONTINUE</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                : null}
                            {allAddress ?
                                <div className="row pt-5">
                                    {userAddress.map((item, k) => {
                                        return (
                                            <div className="addressMangement">
                                                <div className="row">
                                                    <div className="col-md-2 text-center mt-2 col-2">
                                                        <input className="ml-1" name="select" onClick={() => SelectedAddressHandler(item.id)} type="checkbox" />
                                                    </div>
                                                    <div className="col-md-10 col-8">
                                                        <div className="row">
                                                            <div className="col-md-4 col-4">
                                                                <h4>{item.cityname}</h4>
                                                                <small> {item.postcode}</small>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <small> {item.addressline1}</small>
                                                                <small> {item.addressline2}</small><br />
                                                                <small> {item.phone}</small>
                                                            </div>
                                                            <div className="col-md-2 col-2">
                                                                <button onClick={() => AddressDeleteHandler(item.id)} className="btn"><MdDelete /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                        </div>
                        <hr />
                        <div className="row">
                            <div className="payment">
                                <h3><strong>SECURE PAYMENT</strong></h3>
                            </div>
                            {openPayment ?
                                <div className="card">
                                    <div className="inner">
                                        <div className=" row pt-4">
                                            <div className="col-md-6">

                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                    </div>
                                                    <div className="col-md-6">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-3 text-center col-4">
                                                <div className="row">
                                                    <div className="col-md-3 col-3">
                                                        <input onChange={() => { paybtn() }} className="mt3" name="radio" type="radio" />
                                                    </div>
                                                    <div className="col-md-3 col-3">
                                                        <label htmlFor="">Paypal</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 text-center col-4">
                                                <div className="row">
                                                    <div className="col-md-3 col-1">
                                                        <input onChange={() => { buttonHandler() }} className="mt3" name="radio" type="radio" />
                                                    </div>
                                                    <div className="col-md-6 col-6">
                                                        <label htmlFor="">Cash on Delivery</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center col-4">
                                                <div className="row">
                                                    <div className="col-md-3 col-3">
                                                        <input onChange={() => { razBtn() }} className="mt3" name="radio" type="radio" />
                                                    </div>
                                                    <div className="col-md-6 col-6">
                                                        <label htmlFor="">Razorpay</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>
                        {next ?
                            <div className="last">
                                <div className="row pt-4">
                                    <h6><strong>Terms and Conditions</strong></h6>
                                </div>
                                <div className="row pt-4">
                                    <textarea name="termsText" id="" cols="30" rows="10">I am over the Age of 18 Years. A person over the age of 18 must be present at the nominated delivery address to sign for the goods.
                                        Due to the nature of our goods, no Authority to Leave requests can be made. We will not accept any claims for disputed deliveries
                                        based on Proof Of Delivery signature at a residential or commercial address. Please ensure your delivery details are accurate as additional
                                        freight charges may be incurred for re-routing or returning freight due to address errors.
                                    </textarea>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <input onChange={termsAndConditions} type="checkbox" />
                                        <label htmlFor="">Yes, I agree with the above terms and conditions</label>
                                    </div>
                                </div>
                                <div className="row pt-3">
                                    {firstConfirmation && secondConfirmation && thirdConfirmation ?
                                        null
                                        :
                                        <p className="text-danger">{ErrorMsg}</p>
                                    }
                                    {firstConfirmation && secondConfirmation && thirdConfirmation ?
                                        <div className="btn">
                                            {checkout ?
                                                <PayPal value={props} />
                                                : razorpay ? <button style={{ backgroundColor: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', width: "50%", height: '3em', borderRadius: '5px', color: '#fff' }}
                                                    className="App-link" data-payment_button_id="pl_IHRD263JqZbzZQ" onClick={displayRazorpay}>
                                                    Buy Now <br /><small className="text-muted">secured by razorpay</small>
                                                </button> :
                                                    <button
                                                        onClick={placeOrder}
                                                        className="btn">PLACE YOUR ORDER</button>
                                            }
                                        </div>
                                        :
                                        <div className="btn">
                                            <button
                                                onClick={showError}
                                                className="btn">PLACE YOUR ORDER
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                            : null}
                    </div>
                    <div className="col-md-6 text-center">
                        <div className="row ">
                            <div className="orderdetails mt-3 ">
                                <div className="row pt-2">
                                    <div className="ordersummer col-md-6">
                                        <h5><strong>Order Summary</strong></h5>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <Link to="/cart"><small>Edit Cart</small></Link>
                                    </div>
                                </div>
                                <hr />
                                <div style={{ height: "15em", overflow: "scroll", overflowX: "hidden" }}>
                                    {details.map((item, k) => {
                                        return (
                                            <div>
                                                <div className="row">
                                                    <h6 className=""><strong>{item.productQuantity}</strong> Bottles</h6>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-3 col-3">
                                                        <img style={{ width: '100%', height: '5em', borderRadius: '5px' }} className="addedimg" src={item.image} alt="" />
                                                    </div>
                                                    <div className="col-md-6 col-4   ">
                                                        <p>{item.name}</p>
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div className="col-md-3 col-5">
                                                        <p><BiRupee />{item.subtotal}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <hr />
                                <div className="row">
                                    <div className="row ">
                                    </div>
                                    <div className="row pt-3">
                                        <div className="col-md-6 col-6">
                                            <h4><strong>TOTAL (INR)</strong></h4>
                                        </div>
                                        <div className="col-md-6 col-6 text-end">
                                            <h5><BiRupee />{granttotal}</h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="row">
                                            <div className="col-md-3 col-2">
                                                <small><u>Coupon code</u></small>
                                                {coupenPreview == 'Coupon applied' ?
                                                    <div className="row">
                                                        <h5 className=" text-success"><strong><u>{coupenPreview}</u></strong></h5>
                                                    </div>
                                                    :
                                                    <div className="row">
                                                        <h5 className=" text-danger"><strong><u>{coupenPreview}</u></strong></h5>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-md-9 col-10">
                                                <form onSubmit={sendCouponHandler}>
                                                    <div className="">
                                                        <div className="">
                                                            <br />
                                                            <input id="couponcode" onChange={couponHandler} className="couponinp" type="text" />
                                                        </div>
                                                        <div className="mt-2">
                                                            <button type="submit" className="btn">APPLY</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
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

export default CheckoutCustomer;