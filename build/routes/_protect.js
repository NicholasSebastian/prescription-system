"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Authentication middleware.
function enforce(...roles) {
    return (req, res, next) => {
        if (!req.isAuthenticated())
            return res.redirect("/login");
        if (roles.length === 0)
            return next();
        else {
            const { role } = req.user;
            if (roles.includes(role))
                return next();
            else
                return res.status(401).end();
        }
    };
}
exports.default = enforce;
