const initialstate={
  isloggedin:false,
  email: "",
  token:"",
  Name:"Guest",
  u_type:"",
  id:0,
  }

const Auth=(state=initialstate,action)=>{
    switch(action.type){
      case "LOGINFAIL":

        return{
          ...state,
          message:action.payload
          };   
     case "LOGINSUCCESS":

        return{
              ...state,
              isloggedin:true,
              Name:action.payload.user.fname+' '+action.payload.user.lname,
              email:action.payload.user.email,
              token:action.payload.token,
              u_type:action.payload.user.u_type,
              id:action.payload.user._id,
              message:""
              };   
    case "LOGOUT":

          return{
            ...state,
            isloggedin:false,
            email: "",
            token:"",
            Name:"Guest",
            u_type:"",
            id:0,
           
            };   
    case "SAVEPROFILESUCCESS":
      return{
            ...state,
            Uploaded_pics:true
            };          
    case "SAVEPROFILEFAIL":
      return{
            ...state,
            Uploaded_pics:false
            };          
    case "SAVEPROFILEDETALSSUCCESS":
      return{
            ...state,
            iscomplete:true
            };  
    case "SAVEPROFILEDETALSFAIL":
      return{
            ...state,
            iscomplete:false
            };  
    default:
        return state;
  
    }
  }
  export default Auth;