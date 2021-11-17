import { RequestHandler } from "express";
import { AccountUser } from "../../models/AccountUser";

// GET: "/patients"
const ListPatients: RequestHandler = async (req, res) => {
    const search = (req.query.search || "") as string;
    try {
        const query: any = { username: { $regex: search, $options: 'i' }, role: "Patient" };
        const projection = ["username", "email", "dateOfBirth"];
        const results = await AccountUser.find(query, projection);
        res.json(results);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ListPatients;