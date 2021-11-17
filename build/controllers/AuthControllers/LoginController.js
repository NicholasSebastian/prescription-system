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
exports.deserializer = exports.serializer = exports.View = void 0;
const bcryptjs_1 = require("bcryptjs");
const AccountUser_1 = require("../../models/AccountUser");
// GET: "/login"
const View = (req, res) => {
    if (req.isAuthenticated())
        req.logout();
    res.render("LoginView");
};
exports.View = View;
// POST: "/login"
const Login = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountUser = yield AccountUser_1.AccountUser.findOne({ username });
        if (!accountUser) {
            return done(null, false, { message: "Incorrect username." });
        }
        const validPassword = yield (0, bcryptjs_1.compare)(password, accountUser.password);
        if (!validPassword) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, accountUser);
    }
    catch (err) {
        return done(err);
    }
});
const serializer = (user, done) => {
    const userId = user._id.toString();
    return done(null, userId);
};
exports.serializer = serializer;
const deserializer = (userId, done) => __awaiter(void 0, void 0, void 0, function* () {
    const accountUser = yield AccountUser_1.AccountUser.findById(userId);
    return done(null, accountUser);
});
exports.deserializer = deserializer;
exports.default = Login;
