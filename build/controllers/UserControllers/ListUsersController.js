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
const AccountUser_1 = require("../../models/AccountUser");
// GET: "/users"
const ListUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = (req.query.search || "");
    try {
        const query = { username: { $regex: search, $options: 'i' } };
        const projection = ["_id", "username", "email", "role"];
        const results = yield AccountUser_1.AccountUser.find(query, projection);
        res.json(results);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = ListUsers;
