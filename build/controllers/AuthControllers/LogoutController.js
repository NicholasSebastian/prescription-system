"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// POST: "/logout"
const Logout = (req, res) => {
    req.logout();
    res.status(200).end();
};
exports.default = Logout;
