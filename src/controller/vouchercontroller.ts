import {isauth} from '../middleware/jwtverify'
import  { AuthenticationError } from 'apollo-server-express';
import mongoose, {model} from 'mongoose';
import  Voucher from '../models/voucher';
import path from 'path';
import savefile from '../uitls/fileupload';

const   uploadDir = './public/vouchers';
export const create_Voucher = async (args:any,context:any) => {
    try{
        const req=context.req;
        const auth=await isauth(req); 
            if(auth){
                const { createReadStream, filename, mimetype, encoding } =  await args.file;
                const voucher = await new Voucher({
                    name:args.name,
                    variant:args.variant,
                    description:args.description,
                    image: `${uploadDir}/${args.uid}${ path.extname(filename)}`,
                    uid:args.uid,
                    price:args.price,
                    quantity:args.quantity,
                    seller:args.seller
                
                    });
                  
                    const data = await voucher.save();
                    console.log("data");
                    console.log(data);
                    if(data){
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
        
        else{
            throw new AuthenticationError('UnAuthorised request.Please Login');
        }
    }catch(err){
        throw new AuthenticationError(err);

    }
}
export const update_Voucher = async (args:any) => {
    return {
        status:1,
        message:"hi"
      };
}
export const delete_Voucher = async (args:any) => {
    return 'hi';
}
export const show_Voucher = async (args:any) => {
    return 'hi';
}
export const show_Vouchers = async (args:any,context:any) => {

    
    try{
        const req=context.req;
        const auth=isauth(req);
        if(auth){
           return await Voucher.find({seller:args.uid})
        }
  
    }catch(err){
        throw new AuthenticationError(err);

    }
}
export const buy_Vouchers = async (args:any,context:any) => {
   
    
}