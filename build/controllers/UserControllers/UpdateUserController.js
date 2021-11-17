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
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const AccountUser_1 = require("../../models/AccountUser");
const SALT_ROUNDS = 10;
// PUT: "/user/:id"
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.password.length > 0) {
            const hashed = yield (0, bcryptjs_1.hash)(data.password, SALT_ROUNDS);
            data["password"] = hashed;
        }
        else {
            delete data.password;
        }
        const query = { _id: id };
        yield AccountUser_1.AccountUser.updateOne(query, data);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = UpdateUser;
