//imports 
import express,{Application,Request,Response,NextFunction} from 'express'
import express_graphql,{graphqlHTTP} from 'express-graphql'
import mongoose from 'mongoose'
import { load } from 'ts-dotenv'
import  path from 'path'

import  { ApolloServer, gql,AuthenticationError } from 'apollo-server-express';


const { resolvers } = require('./apollo/resolver');

const { typeDefs } = require('./apollo/schema');
const app:Application =express();

app.use(express.json()); 
const env = load({
    URI: String,
    PORT:Number,
    jwt_secret:String
});
mongoose.connect( env.URI,{ useNewUrlParser: true , useUnifiedTopology: true},()=>
    console.log("connected to db"));

mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req:Request})=>({req:Request})
});
const publicDir=path.join(__dirname,'../public')
app.use(express.static(publicDir)); 
server.applyMiddleware({ app });

app.listen( env.PORT , () =>
  console.log(`🚀 Server ready at http://localhost:${env.PORT}${server.graphqlPath}`)
)
