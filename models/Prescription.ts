import mongoose, { Schema, Types } from "mongoose";

interface IPrescription {
    _id: Types.ObjectId
    prescriptionDate: string
    prescriptionName: string
    prescriptionDescription: string
    prescriptionToken: string
    prescriptionStatus: string
    prescriptionContent: Array<Types.ObjectId>
    doctorId: Types.ObjectId
    patientId: Types.ObjectId
}

const PrescriptionSchema = new Schema<IPrescription>({
    // '_id' is already automatically added.
    prescriptionDate: String,
    prescriptionName: { type: String, required: true },
    prescriptionDescription: String,
    prescriptionToken: { type: String, required: true },
    prescriptionStatus: { type: String, required: true, default: "Pending" },
    prescriptionContent: [Schema.Types.ObjectId],
    doctorId: { type: Schema.Types.ObjectId, required: true },
    patientId: { type: Schema.Types.ObjectId, required: true }
});

const Prescription = mongoose.model<IPrescription>("prescriptions", PrescriptionSchema);

export { IPrescription, Prescription };