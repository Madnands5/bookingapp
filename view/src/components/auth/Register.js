import React, { Component ,useState} from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import  {Button,Card,Form } from 'react-bootstrap';
import {useSelector,useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import {register} from '../../redux/actions/auth';
import {LOGINFAIL,LOGINSUCCESS,LOGOUT} from '../../redux/actions/actiontypes'

export default function Register() {
  const dispatch = useDispatch();
  const [form, setState] = useState({
  email: '',
  password: '',
  fname:'',
  lname:'',
  u_type:''
  });
  const updateField = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const sign_up = gql`
  mutation  Register($fname: String!, $lname: String!,$email: String!, $password: String!,$u_type: String!) {
    Register(fname: $fname, lname: $lname,email: $email, password:$password,u_type: $u_type) {
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
  
  const [register] = useMutation(sign_up);
function submit(){
  register({ variables: {fname: form.fname, lname: form.lname,email: form.email, password: form.password,u_type: form.u_type} }, { errorPolicy: 'all' }).then(data=>{
    console.log(data.data.Register)
    localStorage.setItem('token', data.data.Login.token);
    dispatch({
        type: LOGINSUCCESS,
        payload: data.data.Register
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
const Auth= useSelector(state => state.Auth);
  function  onChange (e) {
    this.setState({ [e.target.id]: e.target.value });
  };

 

  return (
   
 
    
      <Card className="p-2 justify-content-center" style={{width:"80%",marginLeft:"10%"}}>
      
      <Card.Title className="bg-dark text-light p-2">Register</Card.Title>
        <Form  >
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" id="formBasicname" placeholder="Enter First name" name="fname" value={form.fname}  onChange={updateField}/>
           </Form.Group>
           <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" id="formBasicname" placeholder="Enter Last name" name="lname" value={form.lname}  onChange={updateField}/>
           </Form.Group>
          <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"  id="formBasicEmail"  placeholder="Enter email" name="email" value={form.email}  onChange={updateField}/>
          </Form.Group>
          <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="formBasicPassword" placeholder="Password" name="password" value={form.password}  onChange={updateField}/>
          <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>User Type</Form.Label>
          <Form.Control as="select" name="u_type" value={form.u_type}  onChange={updateField}>
            <option></option>
            <option>Buyer</option>
            <option>Seller</option>
           
          </Form.Control>
        </Form.Group>
          <Form.Text className="text-danger">
            {Auth.message}
          </Form.Text>
          </Form.Group>

          <Button variant="dark"  onClick={() => {submit()}} className="w-100">
          Submit
          </Button>
          <Link
   to="/login"
   style={{
     width: "100%",
     borderRadius: "3px",
     letterSpacing: "1.5px",textDecoration:"underline"
   }}
   className="btn btn-large waves-effect waves-light hoverable blue accent-3"
 >
   Login
 </Link>

        </Form>
             
             </Card>
     );
  
}


