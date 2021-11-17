import { RequestHandler } from "express";
import { IAccountUser } from "../../models/AccountUser";
import { Prescription } from "../../models/Prescription";

// GET: "/prescriptions/patient/:id"
const ListPrescriptions: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user as IAccountUser;
    const search = (req.query.search || "") as string;
    try {
        const query: any = { prescriptionName: { $regex: search, $options: 'i' }, patientId: id, doctorId: _id };
        const projection = ["prescriptionName", "prescriptionToken", "prescriptionStatus"];
        const results = await Prescription.find(query, projection);
        res.json(results);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ListPrescriptions;