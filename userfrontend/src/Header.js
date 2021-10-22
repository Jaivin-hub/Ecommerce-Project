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
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Trans } from 'react-i18next';
function Header() {

    let history = useHistory();

    const [category, setCategory] = useState([])
    const [logout, setLogout] = useState(false)
    const [coupons,setCoupons] = useState([])

    useEffect(() => {
        getCategory()
        getCoupon()
    }, [logout])

    var userName = localStorage.getItem('username');

    const getCategory = () => {
        console.log('helloo')
        axios.get('http://localhost:3000/users/getcategorybackend').then((res) => {
            console.log('success')
            console.log(res.data)
            setCategory(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getCoupon=()=>{
        axios.get('http://localhost:3000/users/getalloffers').then((res) => {
            console.log(res.data)
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

    console.log(category)

    return (
        <div className="main">
            <div className='row pt-3'>
                <div className="col-md-4 col-4">
                    <button onClick={swithHandler} width="100%" className="btn btn-"><StorefrontIcon /></button>
                </div>
                <div className="col-md-4 col-4 text-center">
                    <h1>YourOwn</h1>
                </div>
                <div className="col-md-4 col-4">
                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-10">
                            <div className="row">


                                <div className="col-md-3 ps-5 col-3 text-center">
                                    {userName ?
                                        <button width="100%" onClick={swithProfile} className="btn btn-">{userName} </button>
                                        :
                                        <button width="100%" onClick={swithProfile} className="btn btn-"><AccountCircleIcon /></button>
                                    }
                                </div>
                                <div className="col-md-3 ps-5  col-3 text-center">
                                    <button width="100%" className="btn btn-"><FavoriteBorderIcon /></button>
                                </div>
                                <div className="col-md-1  ps-1 col-3 text-center">
                                    <button onClick={auth} width="100%" className="btn btn-"><ShoppingBagIcon /></button>

                                </div>
                                <div className="col-md-1 ms-1 col-3 text-center">
                                    <Dropdown>
                                        <Dropdown.Toggle style={{width: '10%'}} as="a" >
                                            <div className="navbar-profile">
                                                <p className="mb-0 d-none d-sm-block navbar-profile-name"> <button  width="100%" className="btn btn-"><CircleNotificationsIcon /></button></p>
                                                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                                            <h6 className="p-3 mb-0"><strong>Offers</strong></h6>
                                            
                                            {coupons.map((item, key)=>{
                                                return(
                                                    <Dropdown.Item href="!#" className="preview-item">
                                                <div className="preview-thumbnail">
                                                    <div className="preview-icon bg-dark rounded-circle">
                                                        <i className="mdi mdi-logout text-danger"></i>
                                                    </div>
                                                </div>
                                                <div style={{borderRadius:'5em'}} className="preview-item-content">
                                                    <p className="pt-2">buy upto {item.maxpurchaseamount} and get {item.discount}% off by using <small style={{color: 'green'}}>{item.couponcode}</small> Coupen code</p>
                                                    <p className="preview-subject mb-1"></p>
                                                    <hr />
                                                </div>
                                            </Dropdown.Item>
                                                )
                                            })}
                                            
                                            
                                           
                                           
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                {userName ?
                                    <div className="col-md-3 ps-5 col-3 text-center">
                                        <button onClick={LougoutHander} width="100%" className="btn btn-">Logout</button>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 bg-dark">
                <div className="container">
                    <div className="row text-center">
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            {category.map((itm, k) => {
                                return (
                                    <Nav className="me-auto">
                                        <NavDropdown title={itm.Categoryname} id="collasible-nav-dropdown">
                                        </NavDropdown>
                                    </Nav>
                                )
                            })}
                        </Navbar>
                    </div>
                </div>
            </div>
            <div className="covidOffer row pt-2 text-center">
                <h6><NotificationsIcon />COVID Delivery Impact  | <FavoriteIcon /> We're Here To Help 9074607140</h6>
            </div>
        </div>
    )
}

export default Header;