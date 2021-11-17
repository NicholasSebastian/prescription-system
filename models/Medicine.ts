import mongoose, { Schema, Types } from "mongoose";

interface IMedicine {
    _id: Types.ObjectId
    medicineName: string
}

const MedicineSchema = new Schema<IMedicine>({
    // '_id' is already automatically added.
    medicineName: { type: String, required: true }
});

const Medicine = mongoose.model<IMedicine>("medicines", MedicineSchema);

export { IMedicine, Medicine };