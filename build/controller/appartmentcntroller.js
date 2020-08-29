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
exports.book_appartment = exports.show_appartments = exports.show_appartment = exports.delete_appartment = exports.update_appartment = exports.create_appartment = void 0;
const user_1 = __importDefault(require("../models/user"));
const appartments_1 = __importDefault(require("../models/appartments"));
const fileupload_1 = __importDefault(require("../uitls/fileupload"));
const jwtverify_1 = require("../middleware/jwtverify");
//return savefile(args.file,uploadDir,"test")
const path_1 = __importDefault(require("path"));
const uploadDir = './public/appartment';
exports.create_appartment = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = context.req;
        const auth = jwtverify_1.isauth(req);
        if (auth) {
            console.log("isauth true");
            let userexists = yield user_1.default.findOne({ _id: args.seller });
            if (userexists) {
                const { createReadStream, filename, mimetype, encoding } = yield args.file;
                const apparment = yield new appartments_1.default({
                    name: args.name,
                    description: args.description,
                    image: `${uploadDir}/${args.uid}${path_1.default.extname(filename)}`,
                    uid: args.uid,
                    price: args.price,
                    number_of_rooms: args.number_of_rooms,
                    timeslots: args.timeslots,
                    seller: args.seller
                });
                console.log(apparment);
                const userdata = yield apparment.save();
                if (userdata) {
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
        }
    }
    catch (err) {
        return {
            status: 1,
            message: "err" + err
        };
    }
});
exports.update_appartment = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = context.req;
        const auth = jwtverify_1.isauth(req);
        const filter = { _id: args.id };
        const field = args.field;
        const update = { name: args.name,
            description: args.description,
            uid: args.uid,
            Price: args.price,
            number_of_rooms: args.number_of_rooms,
            timeslots: args.timeslots,
            seller: args.seller };
        if (auth) {
            const userdata = yield appartments_1.default.findOneAndUpdate(filter, update);
            if (userdata) {
                return {
                    status: 1,
                    message: "Can't save file"
                };
            }
        }
    }
    catch (err) {
        return {
            status: 1,
            message: "err" + err
        };
    }
});
exports.delete_appartment = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: 1,
        message: "hi"
    };
});
exports.show_appartment = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = context.req;
        const auth = jwtverify_1.isauth(req);
        if (auth) {
            return yield appartments_1.default.find({ seller: args.uid });
        }
    }
    catch (err) {
    }
});
exports.show_appartments = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = context.req;
        const auth = jwtverify_1.isauth(req);
        if (auth) {
            return yield appartments_1.default.find({ seller: args.uid });
        }
    }
    catch (err) {
    }
});
exports.book_appartment = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: 1,
        message: "hi"
    };
});
