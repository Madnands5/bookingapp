"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    voucher_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Voucher"
    },
    buyer_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    price: {
        type: Number,
    },
    number_of_rooms: {
        type: Number,
    },
    timeslots: {
        type: Array,
    },
});
module.exports = mongoose_1.default.model('Order', OrderSchema);
