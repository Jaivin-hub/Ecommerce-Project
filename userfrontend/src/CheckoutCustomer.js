
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PayPal from './PayPal'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import Footer from './Footer'


function CheckoutCustomer() {

    const [granttotal, setGranttotal] = useState()
    const [deleteAddress, setDeleteAddress] = useState(false)


    useEffect(() => {
        getCart()
        getAddress()
    }, [deleteAddress])





    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('id')
    let username = localStorage.getItem('username')


    const [details, setDetails] = useState([])
    const [coupon, setCoupon] = useState()
    const [allAddress, setAllAddress] = useState(false)

    const [div, setDiv] = useState(true)

    const [next, setNext] = useState(true)

    const [open, setOpen] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [checkout, setCheckout] = useState(false)
    const [addressId, setAddressId] = useState('')
    const [userAddress, setUserAddress] = useState([])

    const firstStep = () => {
        setDiv(false)
    }

    console.log(userAddress)

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
        console.log('function activated');
        axios.get(`http://localhost:3000/users/getcart/${userId}`).then((res) => {
            const newdetails = res.data
            const values = newdetails.response
            console.log('all set')
            setDetails(values.products)
            setGranttotal(newdetails.grantTotal)
        })
    }

    const getAddress = () => {
        axios.get(`http://localhost:3000/users/getAllAddress/${userId}`).then((res) => {
            console.log('res' + res)
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


    const firstnameHandler = (value) => {
        setFirstname(value)
    }

    const lastnameHandler = (value) => {
        setLastname(value)
    }

    const companynameHandler = (value) => {
        setCompanyname(value)
    }

    const addressline1Handler = (value) => {
        setAddressline1(value)
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

    const postcodeHandler = (value) => {
        setPostcode(value)
    }

    const phoneHandler = (value) => {
        setPhone(value)
    }

    const billingSubmitHandler = (e) => {
        e.preventDefault()
        console.log('continue');
        let Data = {
            firstname: firstname,
            lastname: lastname,
            companyname: companyname,
            addressline1: addressline1,
            addressline2: addressline2,
            cityname: cityname,
            statename: statename,
            postcode: postcode,
            phone: phone,
            userid: userId
        }

        axios.post("http://localhost:3000/users/userdetails", Data).then((res) => {
            console.log('success')

        })

        setOpenPayment(true)
        SetAddAddress(false)

        console.log(Data)

    }

    const couponHandler = (e) => {
        const coupenData = { ...coupon }
        coupenData[e.target.id] = e.target.value
        setCoupon(coupenData)
    }

    const sendCouponHandler = (e) => {
        e.preventDefault()
        let name = coupon.couponcode
        let totalAmount = granttotal
        let data = { name, totalAmount }

        axios.post("http://localhost:3000/users/coupenentered", data).then((res) => {
            console.log('success')
            console.log(res.data)
            setGranttotal(res.data)
        })
    }

    console.log(coupon)


    const AddressDeleteHandler = (id) => {
        setDeleteAddress(!deleteAddress)
        console.log(id)
        const data = { id, userId }
        console.log('action')
        axios.post(`http://localhost:3000/users/deleteAddress`, data).then((res) => {
        })
    }

    const placeOrder = () => {
        const details = { granttotal, userId, addressId }
        axios.post(`http://localhost:3000/users/orderplaced`, details).then((res) => {
            console.log('Order placed')

        })
    }

    const logOutHandler = () => {
        setDiv(true)
        localStorage.clear();
    }


    const SelectedAddressHandler = (id) => {
        setAddressId(id)
        setOpenPayment(true)
    }

    console.log(addressId);

    const props = { granttotal, addressId }


    const UserName = username.toUpperCase()

    return (
        <div className="col-md-12">
            <div className="container">
                <div className="row pt-5 ps-5">
                    <div className="col-md-6">
                        <div className="row">
                            {token ?
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <h3><strong>CUSTOMER</strong></h3>
                                            <small><strong>{UserName}</strong></small>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <div className="signoutbtn pt-1">
                                            <button onClick={logOutHandler} className="btn">LOG OUT</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3><strong>CUSTOMER</strong></h3>
                                            <small>Don’t have an account? Create an account to continue.</small>
                                        </div>
                                    </div>
                                    <div className="stepone">
                                        <div className="loginbox pt-3">
                                            <label htmlFor="">Email</label><br />
                                            <input className="logininp" type="text" />
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
                        {/* {!token ?
                            <div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <h3><strong>CUSTOMER</strong></h3>
                                        <small>Don’t have an account? Create an account to continue.</small>
                                    </div>
                                </div>
                                <div className="stepone">
                                    <div className="loginbox pt-3">
                                        <label htmlFor="">Email</label><br />
                                        <input className="logininp" type="text" />
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
                            : null} */}
                        <hr />
                        <div className="row">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="billing">
                                        <h3><strong>BILLING</strong></h3>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        {allAddress ?
                                            <div className="col-md-6 text-end">
                                                <button onClick={() => setAllAddress(!allAddress)} className="btn">
                                                    Cancel
                                                </button>
                                            </div>
                                            :
                                            <div className="col-md-6 text-end">
                                                <button onClick={() => setAllAddress(!allAddress)} className="btn">
                                                    Select Address
                                                </button>
                                            </div>
                                        }

                                        <div className="col-md-6 text-end">
                                            <button onClick={() => { SetAddAddress(true) }} className="btn">Add Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {addAddress ?
                                <div className="row">
                                    <form onSubmit={billingSubmitHandler}>
                                        <div className="addressdetails">
                                            <label className="pt-3" htmlFor="">Country</label><br />
                                            <select className="form-control" id="stockdetails">
                                                <option>India</option>
                                                <option>Australia</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="addressdetails">
                                                        <label className="pt-3" htmlFor="">First Name</label><br />
                                                        <input onInput={(e) => { firstnameHandler(e.target.value) }} value={firstname} className="countryinp" type="text" />
                                                        <p className="err" style={{ color: 'red' }}>{citynameErr}</p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="addressdetails">
                                                        <label className="pt-3 ms-4" htmlFor="">Last Name</label><br />
                                                        <input onInput={(e) => { lastnameHandler(e.target.value) }} value={lastname} className="countryinp ms-4" type="text" />
                                                        <p className="err" style={{ color: 'red' }}>{statenameErr}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="addressdetails">
                                                <label className="pt-3" htmlFor="">Company Name (Optional)</label><br />
                                                <input onInput={(e) => { companynameHandler(e.target.value) }} value={companyname} className="countryinp" type="text" />
                                                <p className="err" style={{ color: 'red' }}>{companynameErr}</p>
                                            </div>
                                            <div className="addressdetails">
                                                <label className="pt-3" htmlFor="">Address Line 1</label><br />
                                                <input style={{ width: '100%' }} onInput={(e) => { addressline1Handler(e.target.value) }} value={addressline1} className="countryinp" type="text" />
                                                <p className="err" style={{ color: 'red' }}>{addressline1Err}</p>
                                            </div>
                                            <div className="addressdetails">
                                                <label className="pt-3" htmlFor="">Address Line 2 (Optional)</label><br />
                                                <input onInput={(e) => { addressline2Handler(e.target.value) }} value={addressline2} className="countryinp" type="text" />
                                                <p className="err" style={{ color: 'red' }}>{addressline2Err}</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="addressdetails">
                                                        <label className="pt-3" htmlFor="">City</label><br />
                                                        <input onInput={(e) => { citynameHandler(e.target.value) }} value={cityname} className="countryinp" type="text" />
                                                        <p className="err" style={{ color: 'red' }}>{citynameErr}</p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="addressdetails">
                                                        <label className="pt-3 ms-4" htmlFor="">State/Province (Optional)</label><br />
                                                        <input onInput={(e) => { statenameHandler(e.target.value) }} value={statename} className="countryinp ms-4" type="text" />
                                                        <p className="err" style={{ color: 'red' }}>{statenameErr}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="addressdetails">
                                                        <label className="pt-3" htmlFor="">Postal Code</label><br />
                                                        <input onInput={(e) => { postcodeHandler(e.target.value) }} value={postcode} className="countryinp" type="text" />
                                                        <p className="err" style={{ color: 'red' }}>{postcodeErr}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="addressdetails">
                                                        <label className="pt-3 ms-4" htmlFor="">Phone Number</label><br />
                                                        <input onInput={(e) => { phoneHandler(e.target.value) }} value={phone} className="countryinp ms-4" type="text" />
                                                        <p className="err" style={{ color: 'red' }}>{phoneErr}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
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
                                                    <div className="col-md-2 text-center mt-2">
                                                        <input className="ml-1" name="select" onClick={() => SelectedAddressHandler(item.id)} type="checkbox" />
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <h4>{item.cityname}</h4>
                                                                <small> {item.postcode}</small>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <small> {item.addressline1}</small>
                                                                <small> {item.addressline2}</small><br />
                                                                <small> {item.phone}</small>
                                                            </div>
                                                            <div className="col-md-2">
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
                                            <div className="col-md-6 text-center ">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <input onChange={() => { setCheckout(true) }} className="mt3" name="radio" type="radio" />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="">Paypal</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 text-center">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <input onChange={() => { setCheckout(false) }} className="mt3" name="radio" type="radio" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="">Cash on Delivery</label>
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
                                        <input type="checkbox" />
                                        <label htmlFor="">Yes, I agree with the above terms and conditions</label>
                                    </div>
                                </div>




                                <div className="row pt-3">
                                    <div className="btn">
                                        {checkout ?
                                            <PayPal value={props} />
                                            :
                                            <button
                                                onClick={placeOrder}
                                                className="btn">PLACE YOUR ORDER</button>
                                        }
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            <div className="orderdetails">
                                <div className="row pt-2">
                                    <div className="ordersummer col-md-6">
                                        <h5><strong>Order Summary</strong></h5>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <Link to="/cart"><small>Edit Cart</small></Link>
                                    </div>
                                </div>
                                <hr />

                                {details.map((item, k) => {
                                    return (
                                        <div>


                                            <div className="row">
                                                <h6><strong>{item.productQuantity}</strong> Bottles</h6>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img className="addedimg" src="https://cdn11.bigcommerce.com/s-erpoah/products/9181/images/17109/jack-daniels-white-rabbit-saloon-tennessee-whiskey-bottle-700ml__83763.1611800141.200.200.jpg?c=2" alt="" />
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p><BiRupee />{item.subtotal}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                                <hr />
                                <div className="row">
                                    <div className="row ">
                                        <div className="col-md-6">
                                            <h6><strong>TAX</strong></h6>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <p><BiRupee />14.54</p>
                                        </div>
                                    </div>
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <h4><strong>TOTAL (AUD)</strong></h4>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <h5><BiRupee />{granttotal}</h5>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row  pt-3 mt-4">
                                            <small><u>Coupon code</u></small>
                                        </div>
                                        <form onSubmit={sendCouponHandler}>
                                            <div className="row pt-1">
                                                <div className="col-md-6">
                                                    <input id="couponcode" onChange={couponHandler} className="couponinp" type="text" />
                                                </div>
                                                <div className="col-md-4 ms-3   mt-2">
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
            <Footer />
        </div>
    )
}

export default CheckoutCustomer;