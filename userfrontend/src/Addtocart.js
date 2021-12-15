import React, { useEffect, useState } from 'react';
import './style.css'
import { Table, Carousel } from 'react-bootstrap'
import { BiRupee } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import instance from './axios-orders'

import { useHistory } from "react-router-dom";

function Addtocart() {

    // window.location.reload();
    let Userid = localStorage.getItem('id')
    let history = useHistory();


    const id = useParams()
    console.log('ksd')
    const dataId = id.id

    const [details, setDetails] = useState([])
    const [itemdlt, setitemdlt] = useState(false)
    const [addModified, setAddmodified] = useState(false)
    const [granttotal, setGranttotal] = useState()
    const [refresh, setRefresh] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        getcart()
        getOffers()
    }, [addModified, itemdlt])

    const [offerDetails, setOfferDetails] = useState([])

    const getOffers = () => {
        console.log('yaaa yaaa')
        instance.get('/getcouponoffers').then((response) => {
            console.log('data back')
            setOfferDetails(response.data)
            console.log(response.data)
        })
    }


    const getcart = () => {
        instance.get(`/getcart/${Userid}`).then((res) => {
            const newdetails = res.data
            setDetails(newdetails.response.products)
            setGranttotal(newdetails.grantTotal)
        })
    }

    const deleteItem = (itemid) => {
        setitemdlt(!itemdlt)
        const details = { Userid, itemid }
        instance.post(`/deleteitem`, details).then(() => {
            window.location.reload();
        })
    }

    const submitted = () => {
        history.push(`/checkoutcustomer`);
    }

    const AddProduct = (productId, productPrice) => {
        setAddmodified(!addModified)
        const userId = Userid
        const productdetails = { productId, productPrice, userId }
        instance.post(`/updatequantity`, productdetails).then(() => {
        })
    }

    const subtractProduct = (productId, productPrice) => {
        setAddmodified(!addModified)
        const userId = Userid
        const productdetails = { productId, productPrice, userId }
        instance.post(`/dltprd`, productdetails).then(() => {
        })
    }
    const totalquantity = details.length



    return (
        <div className="col-md-12">
            <div className="container ">
                <div className="row text-center pt-4">
                    <h2><strong>YOUR CART ({totalquantity} Items)</strong></h2>
                </div>
                <div className="col-md-12">
                    <div className="row pt-5">
                        <div className="combooffer">
                            <Carousel >
                                {offerDetails.map((item, k) => {
                                    return (
                                        <Carousel.Item className="text-center">
                                            <h3><small>Buy upto {item.maxpurchaseamount} and get {item.discount}% off!
                                                use <strong className="text-success"> {item.couponcode}</strong> copencode</small></h3>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-md-8 col-12">
                            <Table >

                                <thead>
                                    <tr>
                                        <th>ITEM</th>
                                        <th className="text-center">PRICE</th>
                                        <th className="text-center">QUANTITY</th>
                                        <th className="text-center">TOTAL</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((item, index) => {





                                        return (

                                            <tr>
                                                <td>

                                                    <div className="row">
                                                        <div className="col-md-6 col-10">
                                                            <img style={{ width: '150%', height: '5em', borderRadius: "4px" }} src={item.image} alt="" />
                                                        </div>
                                                        <div className="col-md-3 ms-3  col-2">
                                                            <small><small><u>{item.subcategory}</u></small></small>
                                                            <p><strong>{item.name}</strong></p>
                                                        </div>
                                                    </div>


                                                </td>
                                                <td>
                                                    <div className="row pt-4">
                                                        <div className="col-md-2 col-1 text-end">
                                                            <BiRupee />
                                                        </div>
                                                        <div className="col-md-8 col-1">
                                                            <p>{item.price}</p>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>
                                                    {/* <div className="quantity"> */}
                                                    <div className="row mt-4">
                                                        <div className="col-md-2 col-1">
                                                            <button onClick={() => { subtractProduct(item.productId, item.price) }} className="btn"><BiMinus /> </button>
                                                        </div>
                                                        <div className="col-md-2 ms-2 col-1">
                                                            <button className="btn">{item.productQuantity}</button>

                                                        </div>
                                                        <div className="col-md-2 col-1">
                                                            <button onClick={() => { AddProduct(item.productId, item.price) }} className="btn"><BsPlus /></button>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}
                                                </td>
                                                <td>
                                                    <div className="row pt-4">
                                                        <div className="col-md-4 text-end col-1">
                                                            <BiRupee />
                                                        </div>
                                                        <div className="col-md-8 col-1">
                                                            <p>{item.subtotal}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="fordelete" onClick={() => { deleteItem(item.productId) }} >
                                                    <div className="row pt-4">
                                                        <AiFillDelete />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-md-4 pt-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6><strong>TOTAL ITEMS:</strong></h6>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <h6>{totalquantity}</h6>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-6">
                                        <h6><strong>GRAND TOTAL:</strong></h6>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <h6><BiRupee />{granttotal}</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    {showWarning ?
                                        <small style={{ fontSize: "100%", fontWeight: "bold" }} className="text-danger">Cart is empty!</small>
                                        : null
                                    }

                                    {details.length == 0 ?
                                        <div className="proceedbtn mt-2">
                                            <button onClick={() => setShowWarning(true)} className="btn">PROCEED TO CHECKOUT</button>
                                        </div>
                                        :
                                        <div className="proceedbtn">
                                            <button onClick={submitted} className="btn">PROCEED TO CHECKOUT</button>
                                        </div>}

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

export default Addtocart;