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
const AccountUser_1 = require("../../models/AccountUser");
const Prescription_1 = require("../../models/Prescription");
// GET: "/prescriptions/doctor"
const ListPrescriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = (req.query.search || "");
    const { _id } = req.user;
    try {
        const query = { prescriptionName: { $regex: search, $options: 'i' }, doctorId: _id };
        const projection = ["prescriptionName", "patientId", "prescriptionStatus"];
        const results = yield Prescription_1.Prescription.find(query, projection);
        const results2 = yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
            const patient = yield AccountUser_1.AccountUser.findById(result.patientId, "username");
            return {
                _id: result._id,
                name: result.prescriptionName,
                token: result.prescriptionToken,
                patient: patient === null || patient === void 0 ? void 0 : patient.username,
                status: result.prescriptionStatus
            };
        })));
        res.json(results2);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = ListPrescriptions;
