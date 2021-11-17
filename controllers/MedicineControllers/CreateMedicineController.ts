import { RequestHandler } from "express";
import { Medicine } from "../../models/Medicine";

// POST: "/medicine"
const CreateMedicine: RequestHandler = async (req, res) => {
    const { medicineName } = req.body;
    try {
        const newMedicine = new Medicine({ medicineName });
        await newMedicine.save();
        res.status(200).end();
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export default CreateMedicine;