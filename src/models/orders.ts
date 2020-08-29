import   mongoose from 'mongoose';
const OrderSchema= new mongoose.Schema({
    
    voucher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher"
    },
    buyer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    price:{
        type:Number,
    },
    number_of_rooms:{
        type:Number,
    },
    timeslots:{
        type:Array,
       
    },
   
});
module.exports=mongoose.model('Order',OrderSchema);