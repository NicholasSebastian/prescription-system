import { RequestHandler } from "express";
import { Prescription } from "../../models/Prescription";

// DELETE: "/prescription/:id"
const DeletePrescription: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const query = { _id: id };
        await Prescription.deleteOne(query);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default DeletePrescription;