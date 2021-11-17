import { RequestHandler } from "express";
import { IAccountUser, Role } from "../models/AccountUser";

// Authentication middleware.
function enforce(...roles: Array<Role>): RequestHandler {
    return (req, res, next) => {
        if (!req.isAuthenticated()) 
            return res.redirect("/login");
        
        if (roles.length === 0) 
            return next();
        else {
            const { role } = req.user as IAccountUser;
            if (roles.includes(role)) 
                return next();
            else 
                return res.status(401).end();
        }
    }
}

export default enforce;