import { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { AccountUser } from "../../models/AccountUser";

const SALT_ROUNDS = 10;

// PUT: "/user/:id"
const UpdateUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.password.length > 0) {
            const hashed = await hash(data.password, SALT_ROUNDS);
            data["password"] = hashed;
        }
        else {
            delete data.password;
        }

        const query = { _id: id };
        await AccountUser.updateOne(query, data);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default UpdateUser;