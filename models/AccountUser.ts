import mongoose, { Schema, Types } from "mongoose";

type Role = "Admin" | "Doctor" | "Pharmacist" | "Patient";

interface IAccountUser {
    _id: Types.ObjectId
    username: string
    password: string
    name: string
    nric: string
    email: string
    contact: string
    dateOfBirth: string
    role: Role
}

const AccountUserSchema = new Schema<IAccountUser>({
    // '_id' is implicitly added.
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: String,
    nric: String,
    email: { type: String, required: true },
    contact: String,
    dateOfBirth: String,
    role: { type: String, required: true, default: "Patient" }
});

const AccountUser = mongoose.model<IAccountUser>("users", AccountUserSchema);

export { IAccountUser, Role, AccountUser };