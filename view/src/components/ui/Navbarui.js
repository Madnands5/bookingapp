import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Route } from "react-router-dom";
import Login from '../auth/Login';
import {useSelector,useDispatch } from 'react-redux';
import Profile from '../Profile/Profile'
import '../../App.css'


export default function Navbarui() {
  const Auth= useSelector(state => state.Auth);
  const dispatch = useDispatch();
  
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  sticky="top" >
        <Navbar.Brand>Appname </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="mr-auto" id="responsive-navbar-nav">
       
        
        <Nav className="mr-auto w-50"></Nav>
        <Nav  className="m-1">
          <NavDropdown title={"Welcome "+Auth.Name} id="dropdown-menu-align-right" className="bg-dark text-light" alignRight  style={{width:"150px"}}>
            {Auth.isloggedin==false? <Login style={{padding:"5px"}}/>:<Profile style={{padding:"5px"}}/> }
           
             
          </NavDropdown>
           
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
