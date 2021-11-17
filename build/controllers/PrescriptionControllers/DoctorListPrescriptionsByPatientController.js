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
// GET: "/prescriptions/patient/:id"
const ListPrescriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { _id } = req.user;
    const search = (req.query.search || "");
    try {
        const query = { prescriptionName: { $regex: search, $options: 'i' }, patientId: id, doctorId: _id };
        const projection = ["prescriptionName", "prescriptionToken", "prescriptionStatus"];
        const results = yield Prescription_1.Prescription.find(query, projection);
        res.json(results);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = ListPrescriptions;
