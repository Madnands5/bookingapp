import {SAVEPROFILE, SAVEPROFILESUCCESS,SAVEPROFILEFAIL, SAVEPROFILEDETALSSUCCESS,SAVEPROFILEDETALSFAIL} from './actiontypes';

import axios from 'axios';


export function savepictures(profile,Pic1,Pic2) {
    return (dispatch) => {
console.log("data");
console.log(profile,Pic1,Pic2)
const files = new FormData() 
files.append('profile', profile)
files.append('Pic1', Pic1)
files.append('Pic2', Pic2)
  
    console.log("All files  selected");
    console.log(files)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
    axios.post("http://localhost:5000/userdetails/add_pictures",files,config)
    .then(res => {
      if(res.data.status===1){
        dispatch({
          type: SAVEPROFILESUCCESS
          })
      }else{
        dispatch({
          type: SAVEPROFILEFAIL
          })
      }
    
    })
    .catch(err => 
		console.log(err)
		);

    }
}
export function savedetails(Age,Gender,Duration,Type,Sexuality,Description) {
  return (dispatch) => {
const profiledata={
  Age,Gender,"Relationship_Duration":Duration,"Relationship_type":Type,Sexuality,Description
}

axios.post("http://localhost:5000/userdetails/add_details",profiledata)
    .then(res => {
      if(res.data.status===1){
        dispatch({
          type: SAVEPROFILEDETALSSUCCESS
          })
      }else{
        dispatch({
          type: SAVEPROFILEDETALSFAIL
          })
      }

    })
    .catch(err => 
		console.log(err)
		);

  }}
