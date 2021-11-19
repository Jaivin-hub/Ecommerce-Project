import React, { useState, useEffect } from 'react';
import instance from './axios-orders'
import { BiRupee } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './card.css'

function Products2() {


    useEffect(() => {
        getData()
    }, [])

    let Userid = localStorage.getItem('id')
    let history = useHistory();


    const [data, setData] = useState([])

    const getData = () => {
        instance.get('/getdetails').then((res) => {
            const newData = res.data
            setData(newData)
        })
    }

    const productSelected = (id) => {
        toast.success("Product added to cart.")
        console.log(id)
        let data = { id, Userid }
        instance.post(`/senttheproduct`, data).then((res) => {
            console.log('success');
        })
    }

    const itemSelected = (id) => {
        console.log(id)
        history.push(`/productdetail/${id}`);
    }

    return (
        <div classNameNameName="col-md-12 pt-4">
            <header>
                <div className="container text-center">


                    <div className="logo">
                        <h1><b>FEATURED PRODUCTS</b></h1>
                    </div>
                </div>
            </header>

            <div className="">
                <div className="row">

                    {data.map((item, key) => {
                        return (
                            <div className="col-md-3">
                                <hr />
                                {item.images.map((image, index) => {
                                    return (
                                        <div onClick={() => { itemSelected(item._id) }} className="card profile-card-6"><img style={{height:"25em"}} src={image.image1} className="img img-responsive" />
                                            <div style={{ width: '95%' }} className="profile-name ">
                                                <div className="row">
                                                    <div className="col-md-6 ">
                                                        <h4><strong>{item.name}</strong></h4>
                                                    </div>
                                                    <div className="col-md-6 text-end">
                                                        <small><small>({item.offerdiscount}%Off)</small></small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="profile-position">{item.category}</div>
                                            <div className="profile-overview">
                                                <div className="profile-overview">
                                                    <div className="row text-center">
                                                        <div className="col-xs-4">
                                                            <p>{item.name}</p>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            {/* <h3>50</h3> */}
                                                            <p>{item.description}</p>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            <h3><BiRupee />{item.price}/-</h3>
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="row">
                                    <div className="col-md-12">
                                       
                                            <div className="col-md-12 ps-5">
                                                <button style={{ width: '70%',marginLeft: '11%'}} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw">Add to Cart<GiShoppingBag /></button>
                                                <ToastContainer />
                                            
                                            {/* <div className="col-md-6">
                                                <button style={{ width: '80%' }} className="btn btn-outline-secondary btn-fw">Buy now<GiShoppingBag /></button>

                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
export default Products2