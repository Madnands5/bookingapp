import jwt from 'jsonwebtoken'
import { load } from 'ts-dotenv'
import  { AuthenticationError } from 'apollo-server-express';
const env = load({
    URI: String,
    PORT:Number,
    jwt_secret:String
  });
export const isauth = async (req:any) => {
   try{ 
    const  bearer=  req.headers.authorization
    const token =bearer.split(" ");
     
      
    const verified =await jwt.verify(token[1],env.jwt_secret)
        if(verified){
            return true;
        } else{
            throw new AuthenticationError('UnAuthorised request.Please Login');
        }
    }catch(err){
        throw new AuthenticationError('UnAuthorised request.Please Login:'+err);
    }
}