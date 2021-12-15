import Header from './Header';
import { useEffect, useState } from 'react'
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import ShowProduct from './ShowProduct';
import Addtocart from './Addtocart';
import CheckoutCustomer from './CheckoutCustomer';
import Whisky from './subCategory/whisky';
import Profile from './userProfile'
import History from './History'
import Notification from './Notification'
import OrderPlaced from './OrderPlaced'
import BuyNow from './BuyNow'
import ToWishList from './ToWishList'
import Firstpage from './Firstpage'
import { useLocation } from 'react-router-dom'


function App() {


  // useEffect(() => {
  //   setPath(window.location.pathname)


  // }, [])


  const location = useLocation();
  console.log('pRH' + location.pathname);



  // console.log('path:' + path)
  // const routePath = window.location.pathname

  return (
    <div>
      <Router>
        
        <Switch>
          <Route exact path='/'>
            <Firstpage />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/buyNow">
            <Header />
            <BuyNow />
          </Route>
          <Route path="/buyNow/:id">
            <BuyNow />
          </Route>
          <Route path="/towishlist">
            <ToWishList />
          </Route>
          <Route path="/notification">
            <Notification />
          </Route>
          <Route path="/signup">
            <Header />
            <Signup />
          </Route>
          <Route path="/userprofile">
            <Header />
            <Profile />
          </Route>
          <Route path="/productdetail/:testvalue">
            <Header />
            <ShowProduct />
          </Route>
          <Route path="/history">
            <Header />
            <History />
          </Route>
          <Route path="/cart">
            <Header />
            <Addtocart />
          </Route>
          <Route path="/checkoutcustomer">
            <Header />
            <CheckoutCustomer />
          </Route>
          <Route path="/orderplaced">
            <Header />
            <OrderPlaced />
          </Route>
          <Route path="/whisky/:data">
            <Header />
            <Whisky />
          </Route>
          <Redirect to="/security" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
