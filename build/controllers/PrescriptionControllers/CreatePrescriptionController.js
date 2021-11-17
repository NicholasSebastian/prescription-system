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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const qrcode_1 = __importDefault(require("qrcode"));
const nodemailer_1 = require("nodemailer");
const AccountUser_1 = require("../../models/AccountUser");
const Prescription_1 = require("../../models/Prescription");
const transporter = (0, nodemailer_1.createTransport)({
    service: "hotmail",
    auth: {
        user: "techbytes75@outlook.com",
        pass: "Techbytes@123"
    },
    tls: {
        rejectUnauthorized: false
    }
});
function SendEmail(token, receiver) {
    return __awaiter(this, void 0, void 0, function* () {
        const qrCode = yield qrcode_1.default.toBuffer(token);
        const imgId = "qrcode.techbytes";
        const content = (`
        <p>Your prescription token is <b>${token}</b></p>
        <h3>Your QR code</h3>
        <img src="${imgId}">
        <p>Please present this to your local pharmacist to receive your prescriptions.</p>
    `);
        const mailOptions = {
            from: "TechBytes <techbytes75@outlook.com>",
            to: receiver,
            subject: "Your Prescription Token",
            html: content,
            attachments: [
                {
                    filename: "qrcode.png",
                    content: qrCode,
                    cid: imgId
                }
            ]
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                console.log(error);
            else
                console.log(`Message ${info.messageId} sent successfully`);
        });
    });
}
// POST: "/prescription"
const CreatePrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { prescriptionName, prescriptionDescription, prescriptionDate, prescriptionContent, patientId } = req.body;
    try {
        const token = (0, uuid_1.v4)();
        const newPrescription = new Prescription_1.Prescription({
            prescriptionDate,
            prescriptionName,
            prescriptionDescription,
            prescriptionToken: token,
            prescriptionStatus: "Pending",
            prescriptionContent,
            patientId,
            doctorId: _id
        });
        yield newPrescription.save();
        const patient = yield AccountUser_1.AccountUser.findById(patientId, "email");
        if (patient)
            yield SendEmail(token, patient.email);
        res.status(200).end();
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.default = CreatePrescription;
