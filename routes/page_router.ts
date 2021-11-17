import { RequestHandler } from "express";
import { IAccountUser } from "../models/AccountUser";

const RoutePage: RequestHandler = (req, res) => {
    const { role } = req.user as IAccountUser;
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
}

export default RoutePage;