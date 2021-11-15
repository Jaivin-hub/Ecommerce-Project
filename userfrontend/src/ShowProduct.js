import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { BiRupee } from "react-icons/bi";
import { AiOutlineArrowDown, AiFillStar } from "react-icons/ai";
import Footer from './Footer'
import { useParams, useHistory } from 'react-router-dom'
import { GiShoppingBag } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    GlassMagnifier
} from "react-image-magnifiers";


function ShowProduct() {

    let history = useHistory()
    let Userid = localStorage.getItem('id')

    const id = useParams()

    useEffect(() => {
        getData()
        getRelatedproducts()
        getCustomerAlseViewed()
    }, [])

    const [data, setData] = useState([])
    const [relatedData, serRelatedData] = useState([])
    const [products, setProducts] = useState([])
    const [files, setFiles] = useState([])
    const [showImages, setShowImages] = useState()
    const [viewedProducts, setViewedProducts] = useState([])

    const getData = () => {

        const productid = id.testvalue
        console.log(productid)
        axios.post(`http://localhost:3000/users/getexactproduct/${productid}`).then((res) => {
            const newData = res.data
            const newFiles = newData.images
            setShowImages(newFiles[0].image1)
            setFiles(newFiles)
            setData(newData)
        })
    }

    console.log('daata--'+data)

    const getRelatedproducts = () => {
        const productid = id.testvalue
        axios.get(`http://localhost:3000/users/getrelated/${productid}`).then((res) => {
            const newData = res.data
            serRelatedData(newData)
        })
    }

    const productSelected = (id) => {
        toast.success('Product added to cart')
        let data = { id, Userid }
        axios.post(`http://localhost:3000/users/senttheproduct`, data).then((res) => {
        })
    }


    const getCustomerAlseViewed = () => {
        axios.get(`http://localhost:3000/users/getSortData`).then((res) => {
            setViewedProducts(res.data)
        })
    }

    const addtosubmit = (id) => {
        toast.success('Product added to cart')
        let data = { id, Userid }
        axios.post(`http://localhost:3000/users/senttheproduct`, data).then((res) => {
        })

    }

    const imageSelected = (image) => {
        setShowImages(image)
    }

    const itemSelected = (id) => {
        history.push(`/productdetail/${id}`);
    }

    return (
        <div className="col-md-12">
            <div className="container ">
                {files.map((item, key) => {
                    return (
                        <div className="row ">
                            <div className="col-md-6 ">
                                <div className="row ">


                                    <div style={{height: '30em'}} className="col-md-3 pt-5 mt-4">
                                        <div className="firstImage mt-2 ">
                                            <img onClick={() => { imageSelected(item.image1) }} style={{ width: "100%", height: "80%", borderRadius: "5px", cursor: "pointer" }} src={item.image1} alt="oool" />
                                        </div>
                                        <div className="firstImage mt-1">
                                            <img onClick={() => { imageSelected(item.image2) }} style={{ width: "100%", height: "80%", borderRadius: "5px", cursor: "pointer" }} src={item.image2} alt="" />
                                        </div>
                                        <div className="firstImage mt-1">
                                            <img onClick={() => { imageSelected(item.image3) }} style={{ width: "100%", height: "80%", borderRadius: "5px", cursor: "pointer" }} src={item.image3} alt="" />
                                        </div>
                                        <div className="firstImage mt-1">
                                            <img onClick={() => { imageSelected(item.image4) }} style={{ width: "100%", height: "80%", borderRadius: "5px", cursor: "pointer" }} src={item.image4} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-9 mt-5">
                                        <div className="imgmain pt-5">
                                            <GlassMagnifier
                                            style={{ width: '100%', height: "25em", borderRadius: '5px' }}
                                                imageSrc={showImages}
                                                imageAlt=""
                                                magnifierBorderSize={1}
                                                magnifierSize={'50%'}
                                                square={true}
                                            />
                                            {/* <img style={{ width: '100%', height: "25em", borderRadius: '5px' }} src={showImages} alt="" /> */}
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="col-md-6 pt-5">
                                <div className="detail ps-5 ms-5 mt-4">
                                    <small><u>{data.category}</u></small>
                                    <div className="mainname pt-3">
                                        <h3>{data.name}</h3><br />
                                        <h3>{data.description}</h3>
                                    </div>
                                    <div className="price pt-3">


                                        {data.offer ?

                                            <div>
                                                <h5>MRP <del>{data.price}</del></h5>
                                                <h5>{data.offer}</h5>
                                                <h6 className="offer pt-3">(You save {data.offerdiscount}% off )</h6>
                                                <h6><small>Only for <small style={{ color: 'red' }}>{data.offerexpiredate}</small></small></h6>
                                            </div>
                                            :
                                            <h5>MRP {data.price}</h5>
                                        }


                                        <hr />
                                    </div>
                                    <div className="optionsone">
                                        <small>Purchase Option: Size: <small className="text-danger">Required</small></small><br />
                                        <button className="mt-1">Per Bottle</button><br />
                                    </div>
                                    <div className="optionstwo pt-2">
                                        <small className="mt-3">Purchase Option: Packaging: <small className="text-danger">Required</small></small><br />
                                        <button className="mt-1">Bottle Only</button><br />
                                    </div>
                                    <div className="quantity pt-3">
                                        <small>Quantity:</small>
                                        <div className="count">

                                        </div>
                                    </div>
                                    <div className="submit">
                                        <button onClick={() => { addtosubmit(data._id) }} className="addtocartbtn">ADD TO CART</button>
                                        <ToastContainer />
                                    </div>
                                    <hr />
                                    <small><u>Product Details </u></small><AiOutlineArrowDown />
                                </div>
                            </div>
                        </div>
                    )
                })}


                <hr />
                <div className="detalspart">
                    <h5>DESCRIPTION</h5>
                    <p className="pt-3 text-justify">This limited release honours Mr. Jack Daniel's opening of his White Rabbit Saloon which was formerly located in Lynchburg's town square.
                        The saloon was a favourite Lynchburg gathering place where Jack and his friends could spend time together and enjoy a glass of
                        Mr. Jack's fine Tennessee sipping whiskey. Jack was also known to shout the bar on occasion until the famous watering hole was closed due
                        to prohibition and never re-opened. White Rabbit is only available in Tennessee and in select international markets.</p>

                    <p className="pt-3">"Pure class and the clever use of sugars simply make you drool." - Jim Murray's Whisky Bible</p>

                    <h6 className="pt-3"><strong>Tasting Note: Caramel, vanilla and a hint of spice riding high on this stronger Jack Daniel's bottling. The finish is suitably longer and spicier.</strong></h6>
                    <hr />
                </div>
                <div className="detailsparttwo">
                    <h5>ADDITIONAL DETAILS</h5>
                    <p className="pt-3"><strong>SKU:</strong>10941-NGB-UNIT</p>
                    <p className="pt-1"><strong>Container Type:</strong>Bottle</p>
                    <p className="pt-1"><strong>Size:</strong>700</p>
                    <p className="pt-1"><strong>Country:</strong>United States</p>
                    <p className="pt-1"><strong>Alcohol %:</strong>43</p>
                    <p className="pt-1"><strong>Region:</strong>Tennessee</p>
                    <p className="pt-1"><strong>Style:</strong>Tennessee Whiskey</p>
                    <p className="pt-1"><strong>Varietal:</strong>American Whiskey</p>
                    <hr />
                </div>
                <div className="review text-center">
                    <h3><strong>1 REVIEW</strong></h3>
                    <div className="pt-3">
                        <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                        <h4 className="pt-2">JACK DANIEL&#039;S WHITE RABBIT <br /> SALOON</h4>
                        <small>Smooth and delicious</small>
                        <hr />
                    </div>
                </div>
                <div className="related text-center">
                    <h3><strong>RELATED PRODUCTS</strong></h3>
                </div>
                <div className="row pt-5">

                    {relatedData.map((item, key) => {
                        return (
                            <div className="col-md-4">
                                <hr />
                                {item.images.map((image, i) => {
                                    return (
                                        <div onClick={() => { itemSelected(item._id) }} className="card profile-card-6"><img style={{ height: "25em" }} src={image.image1} className="img img-responsive" />
                                            <div className="profile-name">{item.name}
                                            </div>
                                            <div className="profile-position">{item.subcategory}</div>
                                            <div className="profile-overview">
                                                <div className="profile-overview">
                                                    <div className="row text-center">
                                                        <div className="col-xs-4">
                                                            <h3>1</h3>
                                                            <p>{item.name}</p>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            <h3>{item.size}</h3>
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
                                            <div className="col-md-12 ps-5">
                                                <button style={{ width: '90%',marginLeft:'0%' }} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw">Add to Cart<GiShoppingBag /></button>
                                                <ToastContainer />
                                            </div>
                                            {/* <div className="col-md-6">
                                                <button style={{ width: '80%' }} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw">Buy now<GiShoppingBag /></button>

                                            </div> */}
                                        
                                    </div>

                               
                            </div>
                        )
                    })}

                </div>
                <hr />
                <div className="alsoviewed text-center pt-4">
                    <h3><strong>CUSTOMERS ALSO VIEWED</strong></h3>
                </div>

                <div className="row pt-5">

                    {viewedProducts.map((item, key) => {
                        return (
                            <div className="col-md-4">
                                <hr />
                                {item.images.map((image, i) => {
                                    return (
                                        <div onClick={() => { itemSelected(item._id) }} className="card profile-card-6"><img style={{ height: "25em" }} src={image.image1} className="img img-responsive" />
                                            <div className="profile-name">{item.name}
                                            </div>
                                            <div className="profile-position">{item.subcategory}</div>
                                            <div className="profile-overview">
                                                <div className="profile-overview">
                                                    <div className="row text-center">
                                                        <div className="col-xs-4">
                                                            <h3>1</h3>
                                                            <p>{item.name}</p>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            <h3>50</h3>
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
                                                <button style={{ width: '80%',marginLeft: '11%' }} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw">Add to Cart<GiShoppingBag /></button>

                                          
                                            {/* <div className="col-md-6">
                                                <button style={{ width: '80%' }} onClick={() => { productSelected(item._id) }} className="btn btn-outline-secondary btn-fw">Buy now<GiShoppingBag /></button>

                                            </div> */}
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShowProduct;