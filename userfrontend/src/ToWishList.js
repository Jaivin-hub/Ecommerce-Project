import React, { useEffect, useState } from 'react';
import './style.css'
import { Table } from 'react-bootstrap'
import { BiRupee } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';

import Footer from './Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from "react-router-dom";

function ToWishList() {

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
    let sum = 0

    useEffect(() => {
        getcart()
    }, [addModified, itemdlt])

    // const getData = () => {
    //     axios.get(`http://localhost:3000/users/gettheproduct/${dataId}`).then((res) => {
    //     })
    // }

    const productSelected = (id) => {
        toast.success("Product added to cart")
        let data = { id, Userid }
        axios.post(`http://localhost:3000/users/senttheproduct`, data).then((res) => {
        })
    }

    const getcart = () => {
        // setRefresh(!refresh)
        axios.get(`http://localhost:3000/users/getWishlist/${Userid}`).then((res) => {
            const newdetails = res.data
            setDetails(newdetails.response.products)
            setGranttotal(newdetails.grantTotal)
        })
    }

    const deleteItem = (itemid) => {
        setitemdlt(!itemdlt)
        console.log('deleteFunction' + itemid)
        const details = { Userid, itemid }
        console.log('function activated')
        axios.post(`http://localhost:3000/users/deleteitem`, details).then(() => {
            console.log('okkkk')
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
        console.log('hoooooo')
        console.log(productdetails)
        axios.post(`http://localhost:3000/users/updatequantity`, productdetails).then(() => {
            console.log('okkkk')
        })
    }

    const subtractProduct = (productId, productPrice) => {
        setAddmodified(!addModified)
        const userId = Userid
        const productdetails = { productId, productPrice, userId }
        axios.post(`http://localhost:3000/users/dltprd`, productdetails).then(() => {
            console.log('okkkk')
        })
    }

    const buyNow = (id) => {
        history.push(`/buyNow${id}`)
    }

    console.log('all is set')
    console.log(details)
    const totalquantity = details.length

    console.log(details)

    return (
        <div className="col-md-12">
            <div className="container">
                <div className="row text-center pt-4">
                    <h2><strong>YOUR FEVORITE ({totalquantity} Items)</strong></h2>
                </div>
                <div className="col-md-12">
                    <div className="row pt-5">
                        <div className="combooffer text-center">
                            <p>CHECK YOUR NOTIFICATION IS ANY OFFERS AVAILABLE OR NOT.</p>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-md-8">
                            <Table >
                                <thead>
                                    <tr>

                                        <th>ITEM</th>
                                        <th className="text-center">PRICE</th>
                                        <th>    </th>
                                        <th></th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((item, index) => {





                                        return (

                                            <tr>
                                                <td>

                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <img style={{ width: '80%', height: '5em', borderRadius: "4px" }} src={item.image} alt="" />
                                                        </div>
                                                        <div className="col-md-6 ms-3">
                                                            <small><small><u>{item.subcategory}</u></small></small>
                                                            <p><strong>{item.name}</strong></p>
                                                        </div>
                                                    </div>


                                                </td>
                                                <td>
                                                    <div className="row pt-4">
                                                        <div className="col-md-2">
                                                            <BiRupee />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <p>{item.price}</p>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="row pt-4">
                                                        <button style={{ width: '100%' }} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw"><small>AddToCart</small><GiShoppingBag /></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="row pt-4 ps-1">
                                                        <button style={{ width: '100%' }} onClick={() => { buyNow(item._id) }} className="btn btn-outline-secondary btn-fw">Buynow<GiShoppingBag /></button>
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

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ToWishList;