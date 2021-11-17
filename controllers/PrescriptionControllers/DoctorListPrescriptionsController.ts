import { RequestHandler } from "express";
import { AccountUser, IAccountUser } from "../../models/AccountUser";
import { Prescription } from "../../models/Prescription";

// GET: "/prescriptions/doctor"
const ListPrescriptions: RequestHandler = async (req, res) => {
    const search = (req.query.search || "") as string;
    const { _id } = req.user as IAccountUser;
    try {
        const query: any = { prescriptionName: { $regex: search, $options: 'i' }, doctorId: _id };
        const projection = ["prescriptionName", "patientId", "prescriptionStatus"];
        const results = await Prescription.find(query, projection);
        const results2 = await Promise.all(results.map(async result => {
            const patient = await AccountUser.findById(result.patientId, "username");
            return {
                _id: result._id,
                name: result.prescriptionName,
                token: result.prescriptionToken,
                patient: patient?.username,
                status: result.prescriptionStatus
            };
        }));
        res.json(results2);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ListPrescriptions;