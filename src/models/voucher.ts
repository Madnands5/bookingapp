import mongoose, { Schema, Document ,model} from 'mongoose';
export const VoucherSchema: Schema = new Schema({
    name:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    variant:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    description:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    image:{
        type:String,
        required:true,
        min:2,
        max:255
    },
    uid:{
        type:String,
        required:true,  
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});
;
const Voucher =model('Voucher',VoucherSchema)
export default Voucher;
