import { RequestHandler } from "express";
import { AccountUser } from "../../models/AccountUser";
import { Medicine } from "../../models/Medicine";
import { Prescription } from "../../models/Prescription";

// GET: "/prescription/token/:token"
const ViewPrescription: RequestHandler = async (req, res) => {
    const { token } = req.params;
    try {
        const prescription = await Prescription.findOne({ prescriptionToken: token });
        if (prescription) {
            const doctor = await AccountUser.findById(prescription.doctorId, "username");
            const patient = await AccountUser.findById(prescription.patientId, "username");
            const content = await Promise.all(prescription.prescriptionContent.map(async item => {
                const medicine = await Medicine.findById(item, "medicineName");
                return medicine?.medicineName;
            }));

            const data = {
                id: prescription._id,
                name: prescription.prescriptionName,
                description: prescription.prescriptionDescription,
                date: prescription.prescriptionDate,
                token: prescription.prescriptionToken,
                status: prescription.prescriptionStatus,
                content, 
                doctor: doctor ? doctor.username : "", 
                patient: patient ? patient.username : ""
            };

            res.json(data);
        }
        else res.status(400).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export default ViewPrescription;