import { RequestHandler } from "express";
import { AccountUser } from "../../models/AccountUser";

// GET: "/user/:id"
const ViewUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await AccountUser.findById(id);
        res.json(profile);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ViewUser;