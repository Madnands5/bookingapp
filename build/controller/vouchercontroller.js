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
exports.buy_Vouchers = exports.show_Vouchers = exports.show_Voucher = exports.delete_Voucher = exports.update_Voucher = exports.create_Voucher = void 0;
const jwtverify_1 = require("../middleware/jwtverify");
const apollo_server_express_1 = require("apollo-server-express");
const voucher_1 = __importDefault(require("../models/voucher"));
const path_1 = __importDefault(require("path"));
const fileupload_1 = __importDefault(require("../uitls/fileupload"));
const uploadDir = './public/vouchers';
exports.create_Voucher = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = context.req;
        const auth = yield jwtverify_1.isauth(req);
        if (auth) {
            const { createReadStream, filename, mimetype, encoding } = yield args.file;
            const voucher = yield new voucher_1.default({
                name: args.name,
                variant: args.variant,
                description: args.description,
                image: `${uploadDir}/${args.uid}${path_1.default.extname(filename)}`,
                uid: args.uid,
                price: args.price,
                quantity: args.quantity,
                seller: args.seller
            });
            const data = yield voucher.save();
            console.log("data");
            console.log(data);
            if (data) {
                let fileup = yield fileupload_1.default(args.file, uploadDir, args.uid);
                if (fileup) {
                    return {
                        status: 1,
                        message: "Saved"
                    };
                }
                else {
                    return {
                        status: 1,
                        message: "Can't save file"
                    };
                }
            }
        }
        else {
            throw new apollo_server_express_1.AuthenticationError('UnAuthorised request.Please Login');
        }
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError(err);
    }
});
exports.update_Voucher = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: 1,
        message: "hi"
    };
});
exports.delete_Voucher = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return 'hi';
});
exports.show_Voucher = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return 'hi';
});
exports.show_Vouchers = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = context.req;
        const auth = jwtverify_1.isauth(req);
        if (auth) {
            return yield voucher_1.default.find({ seller: args.uid });
        }
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError(err);
    }
});
exports.buy_Vouchers = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
});
