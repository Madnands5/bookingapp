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
exports.resolvers = void 0;
const usercontroller_1 = require("../controller/usercontroller");
const appartmentcntroller_1 = require("../controller/appartmentcntroller");
const vouchercontroller_1 = require("../controller/vouchercontroller");
const user_1 = __importDefault(require("../models/user"));
const ts_dotenv_1 = require("ts-dotenv");
const fileupload_1 = __importDefault(require("../uitls/fileupload"));
const env = ts_dotenv_1.load({
    URI: String,
    PORT: Number,
    jwt_secret: String
});
exports.resolvers = {
    Query: {
        message: () => 'hi',
        User: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield user_1.default.find();
        }),
        appartment: (parent, args, context) => {
            return appartmentcntroller_1.show_appartments(args, context);
        },
        vouchers: (parent, args, context) => {
            return vouchercontroller_1.show_Vouchers(args, context);
        }
    },
    Mutation: {
        Register: (parent, args) => __awaiter(void 0, void 0, void 0, function* () { return usercontroller_1.register(args); }),
        Login: (parent, args) => { return usercontroller_1.login(args); },
        Create_appartment: (parent, args, context) => { return appartmentcntroller_1.create_appartment(args, context); },
        Update_appartment: (parent, args, context) => { return appartmentcntroller_1.update_appartment(args, context); },
        Delete_appartment: (parent, args, context) => { return appartmentcntroller_1.delete_appartment(args, context); },
        Show_appartment: (parent, args, context) => { return appartmentcntroller_1.show_appartment(args, context); },
        Show_appartments: (parent, args, context) => { return appartmentcntroller_1.show_appartments(args, context); },
        Book_appartment: (parent, args, context) => { return appartmentcntroller_1.book_appartment(args, context); },
        Create_Voucher: (parent, args, context) => { return vouchercontroller_1.create_Voucher(args, context); },
        Update_Voucher: (parent, args, context) => { return vouchercontroller_1.update_Voucher(args); },
        Delete_Voucher: (parent, args, context) => { return vouchercontroller_1.delete_Voucher(args); },
        Show_Voucher: (parent, args, context) => { return vouchercontroller_1.show_Voucher(args); },
        Buy_Vouchers: (parent, args, context) => { return vouchercontroller_1.buy_Vouchers(args, context); },
        singleUpload: (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const uploadDir = './public';
                return fileupload_1.default(args.file, uploadDir, "test");
            }
            catch (err) {
                console.log(err);
            }
        }),
    }
};
