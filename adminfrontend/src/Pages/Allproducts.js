import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdDelete } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from '../Components/Navbar'
import './style.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import SearchField from "react-search-field";
import { IoIosArrowDropdown } from "react-icons/io";
import './productcard.css'



function Allproducts() {



    useEffect(() => {
        getData()
    }, [])



    const [data, setData] = useState([])
    const [firstpart, setFirstpart] = useState(false)
    const [secondpart, setSecondpart] = useState(false)
    const [thirdpart, setThirdpart] = useState(false)
    const [forthpart, setForthpart] = useState(false)
    const getData = () => {
        axios.get('http://localhost:3000/users/getproducts').then((res) => {
            const newData = res.data
            setData(newData)
        })
    }

    // const editProduct = (productId) => {
    //     console.log(productId)
    //     axios.post(`http://localhost:3000/users/editproducts/?id=${productId}`).then((value) => {
    //         console.log('it is working')
    //         const newlist = value.data
    //         console.log(newlist)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    //     history.push("/editproducts")

    // }

    const deleteProduct = (productId) => {
        console.log(productId)
        axios.post(`http://localhost:3000/users/deleteproduct/?id=${productId}`).then((response) => {
            console.log('all finish')
        })
    }

    const bottleClicked = () => {
        setFirstpart(!firstpart)
    }

    const priceClicked = () => {
        setSecondpart(!secondpart)
    }

    const sizeClicked = () => {
        setThirdpart(!thirdpart)
    }

    const brandClicked = () => {
        setForthpart(!forthpart)
    }

    console.log(data)

    return (
        <div>
            <Navbar />
            {/* <div style={{height: '55em'}} className="row bg-dark">
            <div className="col-md-2">

            </div>
            <div className="col-md-9">

            
        <div className="allproducts pt-5">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => {
                        return (
                            <tr>
                                <td>1</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td><BiRupee />{item.price}/-</td>
                                <td style={{ cursor: 'pointer' },{color: '#fff' }}><Link to={`/editproducts/${item._id}`}><FaEdit /></Link></td>
                                <td onClick={() => { deleteProduct(item._id) }} style={{ cursor: 'pointer' }}><MdDelete /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </div>
        </div>
        </div> */}

            <div className="addproductmain col-md-12">
                <div className="alldetails">
                    <div className="row pt-4">
                        <h3><strong>Products</strong></h3>
                    </div>
                    <div className="row">
                        <div className="col-md-6 pt-5">
                            <button className="Addproductsbtn"><strong><AiOutlinePlusCircle />  Add Products</strong></button>
                        </div>
                        <div className="col-md-6">
                            <SearchField
                                placeholder="Search..."
                                searchText=""
                                classNames="my-input"
                            />
                        </div>
                    </div>
                    <div className="row pt-4">

                        <div className="col-md-2">
                            <div className="productdetailsdiv  mt-4">
                                <div className="container">
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <h5><strong>Bottles</strong></h5>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="arrow" onClick={bottleClicked}><IoIosArrowDropdown /></h5>
                                        </div>
                                    </div>
                                    {firstpart ?
                                        <div className="row">
                                            <small>WHISKY</small>
                                            <small>SPIRITS</small>
                                            <small>LIQUEUR</small>
                                            <small>WINE</small>
                                        </div>
                                        : null}
                                    <hr />
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <h5><strong>Price</strong></h5>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="arrow" onClick={priceClicked}><IoIosArrowDropdown /></h5>
                                        </div>
                                    </div>
                                    {secondpart ?
                                        <div>
                                            <div className="row pt-3">
                                                <div className="col-md-6">
                                                    <input className="priceinp" placeholder="Min" type="text" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input className="priceinp" placeholder="Max" type="text" />
                                                </div>
                                            </div>
                                            <div className="row pt-3">
                                                <button className="filter">Filter</button>
                                            </div>
                                        </div>
                                        : null}
                                    <hr />

                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <h5><strong>Size</strong></h5>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="arrow" onClick={sizeClicked}><IoIosArrowDropdown /></h5>
                                        </div>
                                    </div>
                                    {thirdpart ?
                                        <div className="row pt-3">
                                            <div className="col-md-4">
                                                <button className="sizeinp">Liter</button>
                                            </div>
                                            <div className="col-md-4">
                                                <button className="sizeinp">Full</button>
                                            </div>
                                            <div className="col-md-4">
                                                <button className="sizeinp">Half</button>
                                            </div>
                                        </div>
                                        : null}
                                    <hr />
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <h5><strong>Brands</strong></h5>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="arrow" onClick={brandClicked}><IoIosArrowDropdown /></h5>
                                        </div>
                                    </div>
                                    {forthpart ?
                                        <div className="row">
                                            <small>WHISKY</small>
                                            <small>SPIRITS</small>
                                            <small>LIQUEUR</small>
                                            <small>WINE</small>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="containet">
                                <div className="row">
                                    {data.map((item, key) => {
                                        return (
                                            <div className="col-md-3">
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
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Allproducts;