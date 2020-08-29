import mongoose, { Schema, Document ,model} from 'mongoose';
export const BookingSchema: Schema = new Schema({
    
    appartment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appartment"
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
    dateslot:{
        type:Array,
    },
    timeslots:{
        type:Array,
    },
   
});
const Booking = model('Booking',BookingSchema);
export default Booking;
