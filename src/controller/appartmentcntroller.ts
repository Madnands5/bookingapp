import mongoose, {model} from 'mongoose';
import  User from '../models/user';
import  Apparment from '../models/appartments';
import savefile from '../uitls/fileupload';

import  { AuthenticationError } from 'apollo-server-express';
import {isauth} from '../middleware/jwtverify'
//return savefile(args.file,uploadDir,"test")
import path from 'path';

const   uploadDir = './public/appartment';
export const create_appartment = async (args:any,context:any) => {
    try{
        const req=context.req;
        const auth=isauth(req);
        if(auth){
            console.log("isauth true");
            let userexists = await User.findOne({_id: args.seller})
            if (userexists) {
                const { createReadStream, filename, mimetype, encoding } =  await args.file;

                const apparment = await new Apparment({
                    name:args.name,
                    description:args.description,
                    image: `${uploadDir}/${args.uid}${ path.extname(filename)}`,
                    uid:args.uid,
                    price:args.price,
                    number_of_rooms:args.number_of_rooms,
                    timeslots:args.timeslots,
                    seller:args.seller
            
                });
                console.log(apparment);
                const userdata = await apparment.save();
                if(userdata){
                    let fileup =await savefile(args.file,uploadDir,args.uid);
                    if(fileup){
                        return {
                        status:1,
                        message:"Saved"
                        };
                    }else {
                        return {
                        status:1,
                        message:"Can't save file"
                        };
                    }
                }
            }
        }
    }catch(err){
        return {
            status:1,
            message:"err"+err
        };
        
    }

}

export const update_appartment = async (args:any,context:any) => {
    try{
        const req=context.req;
       const auth=isauth(req);
       const filter = { _id: args.id};
       const field = args.field;
       
const update = {  name:args.name,
    description:args.description,
    uid:args.uid,
    Price:args.price,
    number_of_rooms:args.number_of_rooms,
    timeslots:args.timeslots,
    seller:args.seller };
       if(auth){

           const userdata= await Apparment.findOneAndUpdate(filter, update);
            if(userdata){
                return {
                    status:1,
                    message:"Can't save file"
                    };
            }
       }
   }catch(err){
    return {
        status:1,
        message:"err"+err
    };
   }
}
export const delete_appartment = async (args:any,context:any) => {
    return {
        status:1,
        message:"hi"
      };
}
export const show_appartment = async (args:any,context:any) => {
    try{
         const req=context.req;
        const auth=isauth(req);
        if(auth){
            return await Apparment.find({seller:args.uid})
        }
    }catch(err){

    }
}
export const show_appartments = async (args:any,context:any) => {
    try{
        const req=context.req;
       const auth=isauth(req);
       if(auth){
           return await Apparment.find({seller:args.uid})
       }
   }catch(err){

   }
}
export const book_appartment = async (args:any,context:any) => {
    return {
        status:1,
        message:"hi"
      };
}