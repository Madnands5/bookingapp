import React, { Component,useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import  {Button,Card,Form } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import {useSelector,useDispatch } from 'react-redux';
import {LOGINFAIL,LOGINSUCCESS,LOGOUT} from '../../redux/actions/actiontypes'
import {loginuser} from '../../redux/actions/auth';


export default function Login() {
const Auth= useSelector(state => state.Auth);
const dispatch = useDispatch();
const [form, setState] = useState({
  email: '',
  password: '',
  message:'invalid'
});
const updateField = e => {
  setState({
    ...form,
    [e.target.name]: e.target.value
  });
};
const Sign_in = gql`
mutation  Login($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
        user{
            _id
            fname
            lname
            email
            pwd
            u_type
        }
        token
    }
}
`;

const [login] = useMutation(Sign_in);
function submit(){
  login({ variables: { email:form.email, password:form.password} }, { errorPolicy: 'all' }).then(data=>{
  
    localStorage.setItem('token', data.data.Login.token);

    dispatch({
        type: LOGINSUCCESS,
        payload: data.data.Login
        })
    setState({
        ...form,
       message:"success"
      });
}).catch(err=>{
    dispatch({
        type: LOGINFAIL,
        payload:err.message
        })
console.log(err.message);
setState({
...form,
message:err.message
});
});
}

  return (
   
 

      <div >
      
        <Card.Title className="bg-dark text-light p-2">Login</Card.Title>
             <Form  >

             <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name="email" value={form.email}  onChange={updateField}/>

  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={updateField}/>
    <Form.Text className="text-danger">
   {Auth.message}
    </Form.Text>
  </Form.Group>
             
             <Button variant="dark"  onClick={() => {submit()}} className="w-100">
               Submit
             </Button>
          
           
             </Form>
              <Link
   to="/register"
   style={{
     width: "100%",
     borderRadius: "3px",
     letterSpacing: "1.5px",textDecoration:"underline"
   }}
   className="btn btn-large waves-effect waves-light hoverable blue accent-3"
 >
   Register
 </Link>
             </div>
     );
  
}


