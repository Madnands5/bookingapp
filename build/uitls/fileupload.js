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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function savefile(file, uploadDir, file_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const { createReadStream, filename, mimetype, encoding } = yield file;
        const f_path = `${uploadDir}/${file_name}${path_1.default.extname(filename)}`;
        return new Promise((resolve, reject) => createReadStream()
            .on('error', error => {
            if (createReadStream().truncated)
                fs_1.default.unlinkSync(f_path);
            reject(error);
        })
            .pipe(fs_1.default.createWriteStream(f_path))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ path: path_1.default })));
        return file;
    });
}
exports.default = savefile;
