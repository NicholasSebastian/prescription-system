import { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { AccountUser } from "../../models/AccountUser";

const SALT_ROUNDS = 10;

// POST: "/register"
const CreateUser: RequestHandler = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const hashed = await hash(password, SALT_ROUNDS);
        const newAccount = new AccountUser({ email, username, password: hashed });
        await newAccount.save();
        res.status(200).end();
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export default CreateUser;