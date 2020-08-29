import React,{useState} from 'react'
import Navbarui from '../ui/Navbarui';
import {Container,Nav,Form,Card,Button} from 'react-bootstrap';
import Footer from '../ui/footer';
import '../../App.css'
import {useSelector,useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
export default function Bdashboard() {
const UploadMutation = gql`
mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
    filename
    mimetype
    encoding
    }
}
`;
const [uploadFile] = useMutation(UploadMutation);
const [form, setState] = useState({
    file: '',
    password: '',
    message:'invalid'
});
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
    uploadFile({ variables: {file:form.file} }, { errorPolicy: 'all' })
    .then(res=>{console.log(res)}).
    catch(err=>{console.log(err)})

}
    return (
        <Container fluid className="p-0">
        <Navbarui className="m-1"/>
        <Nav className="bg-light"> 
        <Nav.Item>
    <Nav.Link href="/home" active>Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">Bookings</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link >
      Disabled
    </Nav.Link>
  </Nav.Item>
</Nav>
<Container className="p-0">
<Card>
<Form>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Example file input" name="file" onChange={setfile}  accept="image/*"/>
  </Form.Group>

</Form>
<Button variant="dark"  onClick={() => {submit()}} >
               Submit
     </Button>
</Card>
</Container>
         <Footer/>
    </Container>
    ) 
}
