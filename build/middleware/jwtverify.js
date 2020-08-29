"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isauth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ts_dotenv_1 = require("ts-dotenv");
const apollo_server_express_1 = require("apollo-server-express");
const env = ts_dotenv_1.load({
    URI: String,
    PORT: Number,
    jwt_secret: String
});
exports.isauth = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearer = req.headers.authorization;
        const token = bearer.split(" ");
        const verified = yield jsonwebtoken_1.default.verify(token[1], env.jwt_secret);
        if (verified) {
            return true;
        }
        else {
            throw new apollo_server_express_1.AuthenticationError('UnAuthorised request.Please Login');
        }
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError('UnAuthorised request.Please Login:' + err);
    }
});
