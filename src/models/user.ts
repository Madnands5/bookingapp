import mongoose, { Schema, Document ,model} from 'mongoose';
export const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  pwd: { type: String, required: true },
  u_type : { type: String, required: true }
});
const User = model('User',UserSchema);
export default User;