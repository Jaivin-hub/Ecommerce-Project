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

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/allproducts" component={Allproducts} />
        <Route path="/users" component={Users} />
      </Switch>
    </Router>
  );
}

export default App;
