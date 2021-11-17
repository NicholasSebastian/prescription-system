import { RequestHandler } from "express";
import { Prescription } from "../../models/Prescription";
import { AccountUser } from "../../models/AccountUser";
import { Medicine } from "../../models/Medicine";

// GET: "/prescription/:id"
const ViewPrescription: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await Prescription.findById(id);
        if (prescription) {
            const doctor = await AccountUser.findById(prescription.doctorId, "username");
            const patient = await AccountUser.findById(prescription.patientId, "username");
            const content = await Promise.all(prescription.prescriptionContent.map(async item => {
                const medicine = await Medicine.findById(item, "medicineName");
                return { _id: item, name: medicine?.medicineName };
            }));

            const data = {
                _id: prescription._id,
                prescriptionToken: prescription.prescriptionToken,
                prescriptionName: prescription.prescriptionName,
                prescriptionDescription: prescription.prescriptionDescription,
                prescriptionDate: prescription.prescriptionDate,
                prescriptionStatus: prescription.prescriptionStatus,
                doctor: doctor ? doctor.username : "",
                patient: patient ? patient.username : "",
                content
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