import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
  
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout  from './components/ui/main';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Bdashboard from './components/buyer/Bdashboard'
import Sdashboard from './components/seller/Sdashboard';
import Svouchers from './components/seller/Svouchers';
import Adashboard from './components/admin/Adashboard';
import Main from './components/ui/main'
import Footer from './components/ui/footer';
import {useSelector,useDispatch } from 'react-redux';

function App() {
  const Auth= useSelector(state => state.Auth);
  return (
   
        <Router >
     <Switch>
        <Route exact path="/" component={Main}>
        {Auth.isloggedin===false? <Redirect to="/login" /> : (Auth.u_type==="Buyer"? <Redirect to="/buyer"/> : ( Auth.u_type==="Seller" ? <Redirect to="/Seller" />:(Auth.u_type==="Admin"?<Adashboard/>:console.log("Invalid usertype"))))}
        </Route>
        <Route exact path="/Register" component={Register}>
        {Auth.isloggedin===true? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/Login" component={Login}>
        {Auth.isloggedin===true? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/buyer" component={Bdashboard}>
        {Auth.isloggedin===true? <Bdashboard/> : <Login />}
        {( Auth.u_type==="Seller" ? <Redirect to="/Seller" />:console.log("not seller"))}
       
        </Route>
        
      
        <Route exact path="/Seller/Apparment" component={Sdashboard}>
        {Auth.isloggedin===true?  <Sdashboard/> : <Login />}
        </Route>
        <Route exact path="/Seller/Vouchers" component={Sdashboard}>
        {Auth.isloggedin===true? <Svouchers/> : <Login />}
        </Route>
        <Route exact path="/Seller/Bookings" component={Sdashboard}>
        {Auth.isloggedin===true? <div>Bookings</div> : <Login />}
        </Route>
        <Route exact path="/Seller/Orders" component={Sdashboard}>
        {Auth.isloggedin===true? <div>Orders</div> : <Login />}
        </Route>
    
        <Route exact path="/Seller" component={Sdashboard}>
        {Auth.isloggedin===true? <Sdashboard/> : <Login />}
        </Route>
       
    </Switch>
    </Router>

  );
}

export default App;
 