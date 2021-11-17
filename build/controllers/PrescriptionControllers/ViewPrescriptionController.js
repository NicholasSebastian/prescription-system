"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prescription_1 = require("../../models/Prescription");
const AccountUser_1 = require("../../models/AccountUser");
const Medicine_1 = require("../../models/Medicine");
// GET: "/prescription/:id"
const ViewPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const prescription = yield Prescription_1.Prescription.findById(id);
        if (prescription) {
            const doctor = yield AccountUser_1.AccountUser.findById(prescription.doctorId, "username");
            const patient = yield AccountUser_1.AccountUser.findById(prescription.patientId, "username");
            const content = yield Promise.all(prescription.prescriptionContent.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const medicine = yield Medicine_1.Medicine.findById(item, "medicineName");
                return { _id: item, name: medicine === null || medicine === void 0 ? void 0 : medicine.medicineName };
            })));
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
        else
            res.status(400).end();
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = ViewPrescription;
