import {LOGINFAIL,LOGINSUCCESS,LOGOUT} from './actiontypes';
import jwt_decode from 'jwt-decode'
import { Redirect} from "react-router-dom";
import { gql, useMutation } from '@apollo/client'
export function loginuser() {
	return (dispatch) => {
	
		
let email;
let password;
const UPDATE_TODO = gql`
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
const [updateTodo] = useMutation(UPDATE_TODO);
const userData = {
	 email: document.getElementById("formBasicEmail").value,
	password: document.getElementById("formBasicPassword").value
  };
 if((email!=="")&&((password!=="")))
  {
		console.log(userData);
		updateTodo({ variables: { email:email, password:password} }, { errorPolicy: 'all' })
		.then(res => {

		console.log(res.data.Login)
		if(res.data.token){
			const token=res.data.token;
			const decoded = jwt_decode(token);
			//setAuthToken(token);
			dispatch({
				type: LOGINSUCCESS,
				payload:res.data	
				})
				
		}
		else if(res.data.status==="-1"){
			dispatch({
				type: LOGINFAIL,
				payload:res.data.message	
				})
		}
		else if(res.data.details[0].message){
			dispatch({
				type: LOGINFAIL,
				payload:res.data.details[0].message
				})
		}
		
		})
		.catch(err =>
		console.log(err)
		);
		
  }
  else{
	alert("please provide email and passowrd");
  }


}
 
}

export function register(response) {
	return (dispatch) => {
		console.log("registering");
		let email;
		let password;
		let name;
		const userData = {
			name: document.getElementById("formBasicname").value,
			 email: document.getElementById("formBasicEmail").value,
			password: document.getElementById("formBasicPassword").value
		  };
	
		  if((name!=="")&&(email!=="")&&(password!==""))
		  {
				console.log(userData);
				// axios.post("http://localhost:5000/auth/register",userData)
				// .then(res => {
		
				// //console.log(res.data)
				// if(res.data.token){
				// 	const token=res.data.token;
				// 	const decoded = jwt_decode(token);
				// 	setAuthToken(token);
				// 	dispatch({
				// 		type: LOGINSUCCESS,
				// 		payload:res.data	
				// 		})
				// }
				// else if(res.data.status==="-1"){
				// 	dispatch({
				// 		type: LOGINFAIL,
				// 		payload:res.data.message	
				// 		})
				// }
				// else if(res.data.details[0].message){
				// 	dispatch({
				// 		type: LOGINFAIL,
				// 		payload:res.data.details[0].message
				// 		})
				// }
				
				// })
				// .catch(err =>
				// console.log(err)
				// );
		  }
		  else{
			alert("please provide email and passowrd");
		  }
		
		
		}
		 
}
export function logout(response) {
	return (dispatch) => {
		dispatch({
		type: LOGOUT,
		})
	}
}