import { RequestHandler } from "express";

// POST: "/logout"
const Logout: RequestHandler = (req, res) => {
    req.logout();
    res.status(200).end();
};

export default Logout;