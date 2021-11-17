import { RequestHandler } from "express";
import { Medicine } from "../../models/Medicine";

// GET: "/medicines"
const ListMedicines: RequestHandler = async (req, res) => {
    const search = (req.query.search || "") as string;
    try {
        const query = { medicineName: { $regex: search, $options: 'i' } };
        const results = await Medicine.find(query);
        res.json(results);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ListMedicines;