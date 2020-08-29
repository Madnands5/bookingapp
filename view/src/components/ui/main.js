import React from 'react'
import Navbarui from './Navbarui';
import {Container} from 'react-bootstrap';
import Footer from '../ui/footer';

import {useSelector,useDispatch } from 'react-redux';

export default  function Main ( ) {

const Auth= useSelector(state => state.Auth);
const dispatch = useDispatch();
    return (
        <Container fluid className="p-0">
            <Navbarui className="m-1"/>
           
             <Footer/>
        </Container>
    )
}
