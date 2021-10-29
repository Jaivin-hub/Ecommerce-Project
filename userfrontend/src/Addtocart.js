import React, { useEffect, useState } from 'react';
import './style.css'
import { Table } from 'react-bootstrap'
import { BiRupee } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
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
    const [ granttotal,setGranttotal] = useState()
    let sum = 0

    useEffect(() => {
        getcart()
    }, [addModified, itemdlt])

    // const getData = () => {
    //     axios.get(`http://localhost:3000/users/gettheproduct/${dataId}`).then((res) => {
    //     })
    // }


    const getcart = () => {
        console.log('function activated');
        axios.get(`http://localhost:3000/users/getcart/${Userid}`).then((res) => {
            const newdetails = res.data
            console.log(newdetails.grantTotal)
            console.log(newdetails.response.products)
            // const values = newdetails.response
            // console.log(values.products)
            setDetails(newdetails.response.products)
            // console.log('ooooo'+ res.data)
            setGranttotal(newdetails.grantTotal)
        })
    }

    const deleteItem = (itemid) => {
        setitemdlt(!itemdlt)
        console.log('deleteFunction'+ itemid)
        const details = {Userid,itemid}
        console.log('function activated')
        axios.post(`http://localhost:3000/users/deleteitem`,details).then(() => {
            console.log('okkkk')
            window.location.reload();
        })
    }

    const submitted = () => {
        history.push(`/checkoutcustomer`);
    }

    const AddProduct = (productId,productPrice) => {
        setAddmodified(!addModified)
        const userId = Userid
        const productdetails = { productId,productPrice, userId }
       console.log('hoooooo')
        console.log(productdetails)
        axios.post(`http://localhost:3000/users/updatequantity`, productdetails).then(() => {
            console.log('okkkk')
        })
    }

    const subtractProduct = (productId,productPrice) => {
        setAddmodified(!addModified)
        const userId = Userid
        const productdetails = { productId,productPrice, userId }
        axios.post(`http://localhost:3000/users/dltprd`, productdetails).then(() => {
            console.log('okkkk')
        })
    }

    console.log('all is set')
    console.log(details)
    const totalquantity=details.length

    console.log(details)

    return (
        <div className="col-md-12">
            <div className="container">
                <div className="row text-center pt-4">
                    <h2><strong>YOUR CART ({totalquantity} Items)</strong></h2>
                </div>
                <div className="col-md-12">
                    <div className="row pt-5">
                        <div className="combooffer">
                            <p>BUY ANY MIXED 12 BOTTLES OF WINE & RECEIVE 10% OFF! (Discount applied at the checkout.
                                Excludes champagne). PURCHASE ANY 12 PACK STRAIGHT CASE OF WINE AND 10% DISCOUNT ALREADY APPLIES.</p>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-md-8">
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
                                                        <div className="col-md-5">
                                                            <img style={{ width: '150%',height: '5em',borderRadius:"4px" }} src={item.image} alt="" />
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
                                                    {/* <div className="quantity"> */}
                                                    <div className="row mt-4">
                                                        <div className="col-md-2">
                                                            <button onClick={() => { subtractProduct(item.productId,item.price) }} className="btn"><BiMinus /> </button>
                                                        </div>
                                                        <div className="col-md-2 ms-2">
                                                            <button className="btn">{item.productQuantity}</button>

                                                        </div>
                                                        <div className="col-md-2">
                                                            <button onClick={() => { AddProduct(item.productId,item.price) }} className="btn"><BsPlus /></button>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}
                                                </td>
                                                <td>
                                                    <div className="row pt-4">
                                                        <div className="col-md-4 text-end">
                                                            <BiRupee />
                                                        </div>
                                                        <div className="col-md-8">
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
                                        <h6><strong>SHIPPING:</strong></h6>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <h6>Add Info</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6><strong>TAX:</strong></h6>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <h6><BiRupee />9.09</h6>
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
                                    <div className="proceedbtn">
                                        <button onClick={submitted} className="btn">PROCEED TO CHECKOUT</button>
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

export default Addtocart;