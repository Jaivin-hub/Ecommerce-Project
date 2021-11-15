import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiRupee } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './card.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BuyNow from './BuyNow'



function Products() {


    useEffect(() => {
        getData()
    }, [])

    let Userid = localStorage.getItem('id')

    const [data, setData] = useState([])

    let history = useHistory();

    const getData = () => {
        axios.get('http://localhost:3000/users/getdetails').then((res) => {
            const newData = res.data
            setData(newData)
        })
    }

    const productSelected = (id) => {
        toast.success("Product added to cart")
        let data = { id, Userid }
        axios.post(`http://localhost:3000/users/senttheproduct`, data).then((res) => {
        })
    }

    const toWishlist = (id) => {
        let data = { id, Userid }
        axios.post(`http://localhost:3000/users/towishlist`, data).then((res) => {
            console.log('jjjj')
            console.log(res.data.msg)
            if (res.data.msg == false) {
                toast.success("Product already in Wishlist")
            } else {
                toast.success("Product added to Wishlist")
            }
        })
    }


    const itemSelected = (id) => {
        history.push(`/productdetail/${id}`);
    }

    const buyNow = (id) => {
        history.push(`/buyNow${id}`)
        console.log('ivide aaayiii')
    }


    return (
        <div classNameNameName="col-md-12 pt-4 bg-primary">
            <header className="">
                <div className="col-md-12 ">
                    <div className="logo">
                        <h1><b>Buy a Bottle of vodka & GET A BOTTLE OF</b></h1>
                        <h1>DAILY'S Grenadine Syrup</h1>
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
                                        <div onClick={() => { itemSelected(item._id) }} className="card profile-card-6"><img style={{ height: '25em' }} src={image.image1} className="img img-responsive" />

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
                                                            <h3>1</h3>
                                                            <p>{item.name}</p>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            <p>{item.description}</p>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            {item.offer ?
                                                                <>
                                                                    <h4 style={{ color: 'rgba(255, 255, 255, 0.7)' }}><BiRupee /><del><strong>{item.price}</strong></del></h4>
                                                                    <h3><BiRupee />{item.offer}/-</h3>
                                                                </>
                                                                :
                                                                <h3><BiRupee />{item.price}/-</h3>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {/* <div className="row"> */}
                                {/* <div className="col-md-12"> */}
                                <div className="row ">
                                    <div className="col-md-12 col-12 ps-5">
                                        <button style={{ width: '70%', marginLeft: '11%' }} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw"><small>AddToCart</small><GiShoppingBag /></button>
                                        <ToastContainer />
                                    </div>
                                    {/* <div className="col-md-4 col-12 text-center">
                                                <button style={{ width: '80%' }} onClick={() => { toWishlist(item._id) }} className="btn btn-outline-secondary btn-fw"><small>Wishlist <small><FavoriteBorderIcon /></small></small></button>
                                            </div> */}
                                    {/* <div className="col-md-4 col-12">
                                                <button style={{ width: '80%' }} onClick={() => { buyNow(item._id) }} className="btn btn-outline-secondary btn-fw">Buynow<GiShoppingBag /></button>

                                            </div> */}

                                </div>
                                {/* </div> */}

                            </div>
                            // </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Products