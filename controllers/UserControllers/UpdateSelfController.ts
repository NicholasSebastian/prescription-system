import { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { AccountUser, IAccountUser } from "../../models/AccountUser";

const SALT_ROUNDS = 10;

// PUT: "/user"
const UpdateUser: RequestHandler = async (req, res) => {
    const data = req.body;
    const { _id } = req.user as IAccountUser;
    try {
        if (data.password.length > 0) {
            const hashed = await hash(data.password, SALT_ROUNDS);
            data["password"] = hashed;
        }
        else {
            delete data.password;
        }

        const query = { _id };
        await AccountUser.updateOne(query, data);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default UpdateUser;