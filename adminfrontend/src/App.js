import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
import Home from "./Pages/home";
import Allproducts from "./Pages/Allproducts";
import Users from './Pages/Users'
import Addproducts from "./Pages/Addproducts";
import EditProducts from "./Pages/Editproduct";
import Adminsignup from './Pages/Adminsignup'
import AdminLogin from './Pages/AdminLogin'

function App() {
  return (
    <Router>
     
     {/* <Navbar/> */}
      <Switch>
        <Route exact path="/" component={Adminsignup} />
        <Route path="/login" component={AdminLogin} />
        <Route path="/home" component={Home} />
        <Route path="/allproducts" component={Allproducts} />
        <Route path="/users" component={Users} />
        <Route path="/addproducts" component={Addproducts} />
        <Route path="/editproducts/:id" component={EditProducts} />
      </Switch>
    </Router>
  );
}

export default App;
