"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const { gql } = require('apollo-server-express');
exports.typeDefs = gql `
input file {
  filename: String!
  mimetype: String!
  encoding: String!
}


type File {
  filename: String!
  mimetype: String!
  encoding: String!
}
type appartment{
  _id:String!
  name:String!
  description:String!
  uid:String!
  fiel:Upload!
  price:Int!
  number_of_rooms:Int!
  timeslots:[String!]
  seller:String!
  image:String!
}
type voucher{
  _id:String!
  name:String!
  variant:String!
  description:String!
  file:Upload!
  uid:String!
  price:Int!
  quantity:Int!
  seller:String!
  image:String!
}
type User {
  _id: String
  fname: String!
  lname: String!
  email: String!
  pwd: String
  u_type:String!
  token:String
 }
 type status {
  status:String!
  message:String!
}
type UserAuth {
  user:User!
  token:String
}
type Query {
    message:String!
    User: [User!]
    uploads: [File]
    appartment(uid: String!):[appartment!]
    vouchers(uid: String!):[voucher!]
  }
type Mutation {
  Register(fname: String,lname: String,email: String, password: String,u_type:String): UserAuth
  Login(email: String, password: String): UserAuth
  Create_appartment( name:String!,description:String!,uid:String!,file:Upload!,price:Float!,number_of_rooms:Int!,timeslots:[String!],seller:String!) : status
  Update_appartment(email: String) : status
  Delete_appartment(email: String) : status
  Show_appartment(uid: String) : appartment
  Show_appartments(email: String) : [appartment]
  Book_appartment(email: String) : status
  Create_Voucher(name:String!,variant:String!,description:String!,uid:String!,file:Upload!,price:Int!,quantity:Int!,seller:String!) : status
  Update_Voucher(email: String) : status
  Delete_Voucher(email: String) : status
  Show_Voucher(email: String) : status
  Show_Vouchers(email: String) : status
  Buy_Vouchers(email: String) : status
  singleUpload(file: Upload!): File!
}
`;
