"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports 
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const ts_dotenv_1 = require("ts-dotenv");
const path_1 = __importDefault(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
const { resolvers } = require('./apollo/resolver');
const { typeDefs } = require('./apollo/schema');
const app = express_1.default();
app.use(express_1.default.json());
const env = ts_dotenv_1.load({
    URI: String,
    PORT: Number,
    jwt_secret: String
});
mongoose_1.default.connect(env.URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to db"));
mongoose_1.default.connection.on('error', function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log("Mongoose default connection is disconnected");
});
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req: Request }) => ({ req: Request })
});
const publicDir = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicDir));
server.applyMiddleware({ app });
app.listen(env.PORT, () => console.log(`🚀 Server ready at http://localhost:${env.PORT}${server.graphqlPath}`));
