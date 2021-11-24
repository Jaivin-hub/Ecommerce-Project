import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css'
import axios from 'axios'
import instance from './axios-orders'
import { Dropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Trans } from 'react-i18next';
function Header() {

    let history = useHistory();

    const [category, setCategory] = useState([])
    const [logout, setLogout] = useState(false)
    const [coupons, setCoupons] = useState([])
    var userName = localStorage.getItem('username');

    useEffect(() => {
        console.log("running use effect")
        getCategory()
        getCoupon()
    }, [logout, userName])


    const getCategory = async () => {
        instance.get('getcategorybackend').then((res) => {
            setCategory(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getCoupon = () => {
        instance.get('/getalloffers').then((res) => {
            setCoupons(res.data)
        })
    }

    const auth = () => {
        let token = localStorage.getItem('token')
        if (token == undefined) {
            history.push("/login");
        } else {
            history.push('/cart')
        }
    }


    const LougoutHander = () => {
        localStorage.clear();
        history.push("/");
        setLogout(!logout)
    }

    const toWishlist = () => {
        history.push("/towishlist");
    }

    const swithHandler = () => {
        history.push("/");
    }

    const swithProfile = () => {
        let token = localStorage.getItem('token')
        if (token == undefined) {
            history.push("/login");
        } else {
            history.push("/userprofile");
        }
    }

    const subcategoryHandler = (subcategory, maincategory) => {
        console.log(subcategory)
        console.log(maincategory)
        history.push(`/whisky/${subcategory}`)
    }

    return (
        <div className="col-md-12 main">
            <div className="row ">
                <Navbar bg="" expand="lg">

                    <div className="">
                        <button style={{ backgroundColor: '#4e6446' }} onClick={swithHandler} width="100%" className="btn"><StorefrontIcon /></button>
                    </div>
                    <Navbar.Brand style={{ fontSize: '250%', fontWeight: 'bold' }} className="ms-3" onClick={swithHandler}>YourOwn</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="row">
                            <div className="col-md-6">

                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <div className="col-md-3 col-3">
                                                {userName ?
                                                    <button width="100%" onClick={swithProfile} style={{ backgroundColor: '#4e6446' }} className="btn btn-">{userName} </button>
                                                    :
                                                    <button width="100%" onClick={swithProfile} style={{ backgroundColor: '#4e6446' }} className="btn btn-"><AccountCircleIcon /></button>
                                                }
                                            </div>
                                            <div className="col-md-3 col-3 text-center">
                                                <button onClick={auth} width="100%" style={{ backgroundColor: '#4e6446' }} className="btn btn-"><ShoppingBagIcon /></button>

                                            </div>
                                            <div className="col-md-3 col-3 text-center">

                                                <Dropdown>
                                                    <Dropdown.Toggle bsPrefix="p-0" >

                                                        <p className=""> <button style={{ backgroundColor: '#4e6446' }} width="100%" className="btn btn-"><CircleNotificationsIcon /></button></p>

                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="">
                                                        <h6 className="p-3 mb-0"><strong>Offers</strong></h6>
                                                        {coupons.map((item, key) => {
                                                            return (
                                                                <Dropdown.Item href="!#" className="preview-item">
                                                                    <div className="preview-thumbnail">
                                                                        <div className="preview-icon bg-dark rounded-circle">
                                                                            <i className="mdi mdi-logout text-danger"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ borderRadius: '5em' }} className="preview-item-content">
                                                                        <p className="pt-2">buy upto {item.maxpurchaseamount} and get {item.discount}% off by using <small style={{ color: 'green' }}>{item.couponcode}</small> Coupen code</p>
                                                                        <p className="preview-subject mb-1"></p>
                                                                        <hr />
                                                                    </div>
                                                                </Dropdown.Item>
                                                            )
                                                        })}
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>
                                            <div className="col-md-3 col-3 text-end">
                                                {userName ?
                                                    <button onClick={LougoutHander} width="100%" className="btn btn-">Logout</button>
                                                    : null}

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </Navbar.Collapse>

                </Navbar>
            </div>
            <div className="col-md-12 bg-dark">
                <div className="container">
                    <div className="row text-center">
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            {category.map((itm, k) => {
                                return (
                                    <Nav className="me-auto">
                                        <NavDropdown title={itm.Categoryname} id="collasible-nav-dropdown">
                                            {itm.Subcategory.map((item, key) =>
                                            (
                                                <NavDropdown.Item onClick={() => { subcategoryHandler(item, itm.Categoryname) }}>{item}</NavDropdown.Item>
                                            )
                                            )}
                                            <NavDropdown.Divider />
                                        </NavDropdown>
                                    </Nav>
                                )
                            })}
                        </Navbar>
                    </div>
                </div>
            </div>
            <div className="covidOffer col-md-12 pt-2 text-center">
                <h6><NotificationsIcon />COVID Delivery Impact  | <FavoriteIcon /> We're Here To Help 9074607140</h6>
            </div>
        </div>
    )
}

export default Header;