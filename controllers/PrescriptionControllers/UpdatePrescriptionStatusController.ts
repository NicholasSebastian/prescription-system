import { RequestHandler } from "express";
import { Prescription } from "../../models/Prescription";

// PUT: "/prescription/status/:id"
const UpdatePrescription: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const query = { _id: id };
        await Prescription.updateOne(query, { prescriptionStatus: "Completed" });
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default UpdatePrescription;