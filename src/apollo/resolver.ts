import {register,login} from '../controller/usercontroller';
import {create_appartment,update_appartment,delete_appartment,show_appartment,show_appartments,book_appartment} from '../controller/appartmentcntroller';
import {create_Voucher,update_Voucher,delete_Voucher,show_Voucher,show_Vouchers,buy_Vouchers} from '../controller/vouchercontroller';
import  User from '../models/user';
import mongoose, {model} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  { AuthenticationError } from 'apollo-server-express';
import { load } from 'ts-dotenv'
import fs, { createWriteStream, appendFileSync } from 'fs';
import savefile from '../uitls/fileupload';
const env = load({
    URI: String,
    PORT:Number,
    jwt_secret:String
  });
export const resolvers ={
  Query: {
      message : () =>'hi',
      User:async (parent:any, args:any)  => {
      return await User.find();

      },
      appartment:(parent:any,args:any,context:any)=>{
        return show_appartments(args,context);
      },
      vouchers:(parent:any,args:any,context:any)=>{
        return show_Vouchers(args,context);
      }
  },
  Mutation: {
    Register: async (parent:any, args:any  )  => {return register(args);},
    Login: (parent:any, args:any) => {return login(args);},
    Create_appartment:(parent:any, args:any,context:any) => {return create_appartment(args,context);},
    Update_appartment:(parent:any, args:any,context:any) => {return update_appartment(args,context);},
    Delete_appartment:(parent:any, args:any,context:any) => {return delete_appartment(args,context);},
    Show_appartment:(parent:any, args:any,context:any) => {return show_appartment(args,context);},
    Show_appartments:(parent:any, args:any,context:any) => {return show_appartments(args,context);},
    Book_appartment:(parent:any, args:any,context:any) => {return book_appartment(args,context);},
    Create_Voucher:(parent:any, args:any,context:any) => {return create_Voucher(args,context);},
    Update_Voucher:(parent:any, args:any,context:any) => {return update_Voucher(args);},
    Delete_Voucher:(parent:any, args:any,context:any) => {return delete_Voucher(args);},
    Show_Voucher:(parent:any, args:any,context:any) => {return show_Voucher(args);},
  
    Buy_Vouchers:(parent:any, args:any,context:any) => {return buy_Vouchers(args,context);},
    singleUpload: async  (parents:any,args) => {
      try{
      const   uploadDir = './public';
       return savefile(args.file,uploadDir,"test")
      
    }catch(err){
      console.log(err);
    }
  },
}
}