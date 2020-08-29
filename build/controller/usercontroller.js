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
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_express_1 = require("apollo-server-express");
const ts_dotenv_1 = require("ts-dotenv");
const env = ts_dotenv_1.load({
    URI: String,
    PORT: Number,
    jwt_secret: String
});
exports.register = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let emailexist = yield user_1.default.findOne({ email: args.email });
        if (emailexist) {
            throw new apollo_server_express_1.AuthenticationError('Email already exists');
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashpwd = yield bcrypt_1.default.hash(args.password, salt);
            const user = yield new user_1.default({
                fname: args.fname,
                lname: args.lname,
                email: args.email,
                pwd: hashpwd,
                u_type: args.u_type
            });
            const userdata = yield user.save();
            const token = yield jsonwebtoken_1.default.sign({ _id: user._id }, env.jwt_secret);
            return { user, token };
        }
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError(err);
    }
});
exports.login = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.findOne({ email: args.email });
        if (user) {
            const loguser = user.toObject();
            const validpass = yield bcrypt_1.default.compare(args.password, loguser.pwd);
            if (!validpass) {
                throw new apollo_server_express_1.AuthenticationError("Invalid password");
            }
            else {
                const token = yield jsonwebtoken_1.default.sign({
                    _id: user._id
                }, env.jwt_secret);
                return { user, token };
            }
        }
        else {
            throw new apollo_server_express_1.AuthenticationError("Invalid Email");
        }
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError(err);
    }
});
