import { RequestHandler } from "express";
import { AccountUser, IAccountUser } from "../../models/AccountUser";

// GET: "/user
const ViewUser: RequestHandler = async (req, res) => {
    const { _id } = req.user as IAccountUser;
    try {
        const profile = await AccountUser.findById(_id);
        res.json(profile);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ViewUser;