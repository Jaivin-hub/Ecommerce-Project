import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { BiRupee } from "react-icons/bi";
import { AiOutlineArrowDown, AiFillStar } from "react-icons/ai";
import Footer from './Footer'
import { useParams,useHistory } from 'react-router-dom'

function ShowProduct() {

    let history = useHistory()

    const id = useParams()
    console.log(id)

    useEffect(() => {
        getData()
    }, [])

    const [data, setData] = useState([])
    const [products, setProducts] = useState([])

    const getData = () => {
        console.log('in the function')
        const productid = id.testvalue
        console.log(productid)
        axios.post(`http://localhost:3000/users/getexactproduct/${productid}`).then((res) => {
            console.log('it is returning')
            const newData = res.data
            console.log(newData)
            setData(newData)
        })
    }

    const getRelatedproducts = () => {
        axios.get('http://localhost:3000/users/getwhisky').then((res) => {
            const newData = res.data
            setProducts(newData)
        })
    }

    const addtosubmit=(id)=>{
        history.push(`/cart/${id}`)
    }

    console.log('ahksj')
    console.log(data)

    return (
        <div className="col-md-12">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="imgmain pt-5">
                            <img style={{ width: '100%' }} src="https://img.thewhiskyexchange.com/900/vatted_mon1.jpg" alt="" />
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
                                <h5>MRP <del>7000</del></h5>
                                <h5>{data.price}</h5>
                                <h6 className="offer pt-3">(You save $10.00 )</h6>
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
                                <button onClick={()=>{addtosubmit(data._id)}} className="addtocartbtn">ADD TO CART</button>
                            </div>
                            <hr />
                            <small><u>Product Details </u></small><AiOutlineArrowDown />
                        </div>
                    </div>
                </div>


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

                    {products.map((item, key) => {
                        return (
                            <div className="col-md-4">
                                <hr />
                                <div className="profile-card-6"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-6.jpg" className="img img-responsive" />
                                    <div className="profile-name">{item.name}
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
                            </div>
                        )
                    })}

                </div>
                <hr />
                <div className="alsoviewed text-center pt-4">
                    <h3><strong>CUSTOMERS ALSO VIEWED</strong></h3>
                </div>

                <div className="row pt-5">

                    {products.map((item, key) => {
                        return (
                            <div className="col-md-4">
                                <hr />
                                <div className="profile-card-6"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-6.jpg" className="img img-responsive" />
                                    <div className="profile-name">{item.name}
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