import { RequestHandler } from "express";
import { Prescription } from "../../models/Prescription";

// PUT: "/prescription/:id"
const UpdatePrescription: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const query = { _id: id };
        await Prescription.updateOne(query, data);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default UpdatePrescription;