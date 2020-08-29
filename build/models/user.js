"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    pwd: { type: String, required: true },
    u_type: { type: String, required: true }
});
const User = mongoose_1.model('User', exports.UserSchema);
exports.default = User;
