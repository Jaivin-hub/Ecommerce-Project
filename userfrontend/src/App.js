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
import EditProfile from './editProfile';
import Whisky from './subCategory/whisky';
import Profile from './userProfile'
import History from './History'
import Notification from './Notification'

function App() {


  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
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
          <Route path="/editprofile">
            <EditProfile />
          </Route>
          <Route path="/whisky">
            <Whisky name='SCOTCH WHISKY' />
          </Route>
          <Route path="/japanese">
            <Whisky name='JAPANESE WHISKY' />
          </Route>
          <Route path="/irish">
            <Whisky name='IRISH WHISKY' />
          </Route>
          <Route path="/american">
            <Whisky name='AMERICAN WHISKY' />
          </Route>
          <Route path="/australian">
            <Whisky name='AUSTRALIAN WHISKY' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
