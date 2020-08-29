
import mongoose, { Schema, Document ,model} from 'mongoose';
export const ApparmentSchema: Schema = new Schema({
    name:{
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
    number_of_rooms:{
        type:Number,
    },
    timeslots:{
        type:Array,
       
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  
});
const Apparment = model('Apparment',ApparmentSchema);
export default Apparment;
