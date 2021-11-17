import { RequestHandler } from "express";
import { AccountUser } from "../../models/AccountUser";

// GET: "/users"
const ListUsers: RequestHandler = async (req, res) => {
    const search = (req.query.search || "") as string;
    try {
        const query = { username: { $regex: search, $options: 'i' } };
        const projection = ["_id", "username", "email", "role"];
        const results = await AccountUser.find(query, projection);
        res.json(results);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ListUsers;