import React,{useState} from 'react'
import Navbarui from '../ui/Navbarui';
import {Container,Nav,Form,Card,Button,Row,Col,ListGroup} from 'react-bootstrap';
import Footer from '../ui/footer';
import '../../App.css'
import {useSelector,useDispatch } from 'react-redux';
import { gql, useMutation ,useQuery,useLazyQuery} from '@apollo/client';
import {BrowserRouter as Router,Switch,Route,Redirect,Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
//uuidv4();
export default function Svouchers() {
  const Auth= useSelector(state => state.Auth);
    const create_Voucher = gql`
    mutation Create_Voucher($name: String! ,$variant:String!,$description: String!,$uid: String!,$file:Upload!,$price:Int!,$quantity:Int!,$seller:String!) {
      Create_Voucher(name:$name,variant:$variant,description:$description,uid:$uid,file: $file,price:$price,quantity:$quantity,seller:$seller) {
          status
          message
        }
    }
    `;

    const get_voucher = gql`
    query vouchers($uid: String!) {
      vouchers(uid: $uid) {
        _id
        name
        variant
        description
        image
        price
        quantity
        seller
      }
    }
  `;

  const { loading, error, data } = useQuery(get_voucher, {
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
    data.vouchers.map((c, i) => <div className="list-group-item" key={i}><Row><Col>{c.name}</Col><Col><Link to={"Seller/vouchers/view/"+c._id}> <Button>View</Button></Link> <Link to={"Seller/vouchers/edit/"+c._id}><Button>Edit</Button></Link></Col></Row></div>)
    console.log(data)
}


    const [Create_appartment] = useMutation(create_Voucher);
    const [form, setState] = useState({
        file: '',
        name:'',
        message:'invalid',
        uid:uuidv4(),
        desc:'',
        RS:0,
    
        Count:0,
        timeslot:"",
        variant:""

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
   
    
      let Price= form.RS
      Price= parseInt(Price)
     console.log(form,Price)
      Create_appartment({ variables: {name:form.name,variant :form.variant,description:form.desc,uid:form.uid,file:form.file,price:Price,quantity:parseInt(form.Count),seller:Auth.id} }, { errorPolicy: 'all' })
        .then(res=>{console.log(res)}).
         catch(err=>{console.log(err)})
    
    }
        return (
            <Container fluid className="p-0 mb-3">
            <Navbarui className="m-1"/>
            <Nav  variant="tabs" className="bg-light"> 
            <Nav.Item><Link className="nav-link "  role="button" to="/Seller" >Apparment</Link></Nav.Item>
            <Nav.Item><Link className="nav-link active" role="button" to="">Vouchers</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" role="button" to="Seller/Bookings">Bookings</Link></Nav.Item>
            <Nav.Item><Link className="nav-link" role="button" to="Seller/Orders">Orders</Link></Nav.Item>
    
    </Nav>
    <Container className="p-1 mb-3">
    <Row>
        
        <Col  sm={12} md={6}>
    <Form>
      <Form.Group>
      <Form.Control  type="text" placeholder="Voucher-Name" name="name" value={form.name}  onChange={updateField}/>
      </Form.Group>

      <Form.Group>
        <Form.File id="exampleFormControlFile1" label="Voucher image" name="file" onChange={setfile}  accept="image/*"/>
      </Form.Group>
      <Form.Label>Price Rs/voucher
       
        <Form.Control  type="Number" name="RS"  value={form.RS}  onChange={updateField}/>
   
       
        </Form.Label>
        <Form.Group>
        <Form.Label>Quantity
      <Form.Control  type="Number" placeholder="1" name="Count"  value={form.Count}  onChange={updateField}/>
      </Form.Label>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Variant</Form.Label>
    <Form.Control as="select" name="variant" value={form.Count}  onChange={updateField}>
      <option></option>
      <option>Restaurant</option>
      <option>Club</option>
      <option>Museum</option>
      <option>Cinema</option>
    </Form.Control>
  </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1" >
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" name="desc"value={form.desc}  onChange={updateField}/>
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
