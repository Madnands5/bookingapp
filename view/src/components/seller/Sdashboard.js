import React,{useState,useEffect} from 'react'
import Navbarui from '../ui/Navbarui';
import {Container,Nav,Form,Card,Button,Row,Col,ListGroup} from 'react-bootstrap';
import Footer from '../ui/footer';
import '../../App.css'
import {useSelector,useDispatch  } from 'react-redux';
import { gql, useMutation ,useQuery,useLazyQuery} from '@apollo/client';
import {BrowserRouter as Router,Switch,Route,Redirect,Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
//uuidv4();




export default function Sdashboard() {

  const Auth= useSelector(state => state.Auth);
  const get_appartment = gql`
  query appartment($uid: String!) {
    appartment(uid: $uid) {
      _id
      name
      description
      image
      price
      number_of_rooms
      timeslots
      seller
    }
  }
`;
  const { loading, error, data } = useQuery(get_appartment, {
    variables: { uid: Auth.id},
    pollInterval: 50000,
  });
  let List;
if (loading){
   List="Loading";
}
if(error){
   List=error;
}
if (data){
   List= 
    data.appartment.map((c, i) => <div className="list-group-item" key={i}><Row><Col>{c.name}</Col><Col><Link to={"Seller/appartment/view/"+c._id}> <Button>View</Button></Link> <Link to={"Seller/appartment/edit/"+c._id}><Button>Edit</Button></Link></Col></Row></div>)
}
  
 
    const UploadMutation = gql`
    mutation Create_appartment($name: String! ,$description: String!,$uid: String!,$file:Upload!,$price:Float!,$number_of_rooms:Int!,$timeslots: [String!],$seller:String!) {
      Create_appartment(name:$name, description:$description,uid:$uid,file: $file,price:$price,number_of_rooms:$number_of_rooms,timeslots:$timeslots,seller:$seller) {
          status
          message
        }
    }
    `;
   


   
   
    const [Create_appartment] = useMutation(UploadMutation);
    const [form, setState] = useState({
        file: '',
        name:'',
        message:'invalid',
        uid:uuidv4(),
        desc:'',
        RS:0,
     
        Count:0,
        timeslot:"",

    });
    const Selectedf=e=>{
      var elements = document.getElementById(e.target.id).childNodes; 

    
       var selectedKeyValue = {};

     
       var arrayOfSelecedIDs=[];

    let i;
       for(i=0;i<elements.length;i++){

      
         if(elements[i].selected){
          
          selectedKeyValue[elements[i].value]=elements[i].textContent;
        
          arrayOfSelecedIDs.push(elements[i].value)

         }
       

         setState({
          ...form,
          [e.target.name]: arrayOfSelecedIDs
        });
    }
  }
    const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });

    };
    const setfile = e => {
        setState({
          ...form,
          [e.target.name]: e.target.files[0]
        });
    };
    function submit(){
    
    
      let price= form.RS
    
      console.log(form.name)
      Create_appartment({ variables: {name:form.name,description:form.desc,uid:form.uid,file:form.file,price:price,number_of_rooms:parseInt(form.Count),timeslots:form.timeslot,seller:Auth.id} }, { errorPolicy: 'all' })
        .then(res=>{alert(res.data.Create_appartment.message)}).
         catch(err=>{console.log(err)})
    
    }
        return (
            <Container fluid className="p-0" >
            <Navbarui className="m-1"/>
            <Nav  variant="tabs" className="bg-light"> 
            <Nav.Item><Link className="nav-link active"  role="button" to="" >Apparment</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" role="button"  to="Seller/Vouchers">Vouchers</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" role="button"  to="Seller/Bookings">Bookings</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" role="button"  to="Seller/Orders">Orders</Link></Nav.Item>
    
    </Nav>
    <Container className="p-1 mb-3">
    <Row>
        
        <Col  sm={12} md={6}>
    <Form>
      <Form.Group>
      <Form.Control  type="text" placeholder="Appartment-Name" name="name" value={form.name}  onChange={updateField}/>
      </Form.Group>

      <Form.Group>
        <Form.File id="exampleFormControlFile1" label=" Appartment image" name="file" onChange={setfile}  accept="image/*"/>
      </Form.Group>
      <Form.Label>Price Rs/hr
      <Form.Control  type="Number" name="RS"  value={form.RS}  onChange={updateField}/>
      </Form.Label>
        <Form.Group>
        <Form.Label>Number of appartments
      <Form.Control  type="Number" placeholder="1" name="Count"  value={form.Count}  onChange={updateField}/>
      </Form.Label>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1" >
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" name="desc"value={form.desc}  onChange={updateField}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Available Timeslot</Form.Label>
    <Form.Control as="select" multiple name="timeslot"  onChange={Selectedf}>
 
      <option>9am-5pm</option>
      <option>6pm-11pm</option>
      <option>12pm-8pm</option>
    </Form.Control>
  </Form.Group>
    </Form>
  
    <Button variant="dark"  onClick={() => {submit()}} >
                   Submit
    </Button>
    </Col>
    <Col  sm={12} md={6}>

    <div className="list-group">
      {List}
      </div>
    
    </Col>
        </Row>
    </Container>
             <Footer/>
        </Container>
        )
}
