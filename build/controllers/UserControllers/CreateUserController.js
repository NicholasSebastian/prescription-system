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
// POST: "/register"
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const hashed = yield (0, bcryptjs_1.hash)(password, SALT_ROUNDS);
        const newAccount = new AccountUser_1.AccountUser({ email, username, password: hashed });
        yield newAccount.save();
        res.status(200).end();
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.default = CreateUser;
