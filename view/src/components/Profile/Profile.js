import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import  {Button,Card } from 'react-bootstrap';

import {useSelector,useDispatch } from 'react-redux';

import {logout} from '../../redux/actions/auth';


export default function Profile() {
const Auth= useSelector(state => state.Auth);
const dispatch = useDispatch();

function submit(){

dispatch(logout())
localStorage.clear();
}

return (
   
<div className="p-2">
  <Card.Title className="bg-dark text-light p-2">   {"Welcome " + Auth.Name}</Card.Title>
  <Card.Text> {"Type " + Auth.u_type} </Card.Text>
  <Button variant="dark"  onClick={() => {submit()}} className="w-100">
  Logout
  </Button>
</div>
     );
  
}


