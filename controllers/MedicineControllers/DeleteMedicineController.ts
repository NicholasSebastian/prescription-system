import { RequestHandler } from "express";
import { Medicine } from "../../models/Medicine";

// DELETE: "/medicine/:id"
const DeleteMedicine: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const query = { _id: id };
        await Medicine.deleteOne(query);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default DeleteMedicine;