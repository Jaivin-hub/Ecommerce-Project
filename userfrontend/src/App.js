import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

function App() {


  return (
    <div>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path='/security'>
            <Firstpage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/buyNow">
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
            <Signup />
          </Route>
          <Route path="/userprofile">
            <Profile />
          </Route>
          <Route path="/productdetail/:testvalue">
            <ShowProduct />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/cart">
            <Addtocart />
          </Route>
          <Route path="/checkoutcustomer">
            <CheckoutCustomer />
          </Route>
          <Route path="/orderplaced">
            <OrderPlaced />
          </Route>
          <Route path="/whisky/:data">
            <Whisky />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
