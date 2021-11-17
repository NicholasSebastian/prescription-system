"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoutePage = (req, res) => {
    const { role } = req.user;
    switch (role) {
        case "Admin":
            return res.render("AdminView", { user: req.user });
        case "Doctor":
            return res.render("DoctorView", { user: req.user });
        case "Pharmacist":
            return res.render("PharmacistView", { user: req.user });
        default:
            return res.render("PatientView", { user: req.user });
    }
};
exports.default = RoutePage;
