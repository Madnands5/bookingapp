import  User from '../models/user';
import mongoose, {model} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  { AuthenticationError } from 'apollo-server-express';
import { load } from 'ts-dotenv'
const env = load({
    URI: String,
    PORT:Number, 
    jwt_secret:String
  });

export const register = async (args:any) => {
    try {
      let emailexist = await User.findOne({email: args.email})
      if (emailexist) {
        throw new AuthenticationError('Email already exists');
      
      }else {
        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(args.password, salt)

        const user = await new User({
            fname: args.fname,
            lname: args.lname,
            email: args.email,
            pwd: hashpwd,
            u_type:args.u_type
        });
        const userdata = await user.save();
        const token = await jwt.sign({ _id: user._id},env.jwt_secret);
       
      
        return  {user,token};
      }
    }catch (err) {
      throw new AuthenticationError(err);
  }
}
export const login = async (args:any) => {
  try {
    let user = await User.findOne({email: args.email})
 
    if (user) {
      const loguser=user.toObject();
      const validpass = await bcrypt.compare(args.password, loguser.pwd)
      if (!validpass) {
        throw new AuthenticationError("Invalid password"); 
      } else {
          const token = await jwt.sign({
            _id: user._id
        },env.jwt_secret);
        return  {user,token};
      }
    }
    else{
      throw new AuthenticationError("Invalid Email"); 
    }
  }catch (err) {
    throw new AuthenticationError(err);
  }
}

