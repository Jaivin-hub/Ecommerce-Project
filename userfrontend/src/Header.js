import React from 'react';
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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Header() {
    return (
        <div className="main">
            <div className='row pt-3'>
                <div className="col-md-4 col-4">
                    <StorefrontIcon />
                </div>
                <div className="col-md-4 col-4 text-center">
                    <h1>YourOwn</h1>
                </div>
                <div className="col-md-4 col-4">
                    <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3 col-3">
                                    <SearchIcon />
                                </div>
                                <div className="col-md-3 col-3">
                                    <FavoriteBorderIcon />
                                </div>
                                <div className="col-md-3 col-3">
                                    <Link to="/login" className="text-dark"><AccountCircleIcon /></Link>
                                </div>
                                <div className="col-md-3 col-3">
                                    <ShoppingBagIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 bg-dark">
                <div className="container">
                    <div className="row text-center">
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Nav className="me-auto">
                                <NavDropdown title="WHISKY" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav className="me-auto">
                                <NavDropdown title="SPIRITS" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav className="me-auto">
                                <NavDropdown title="LIQUEUR" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav className="text-center">
                                <NavDropdown title="WINE" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
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