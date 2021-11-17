import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import QRCode from "qrcode";
import { createTransport, SendMailOptions } from "nodemailer";
import { AccountUser, IAccountUser } from "../../models/AccountUser";
import { Prescription } from "../../models/Prescription";

const transporter = createTransport({
    service: "hotmail",
    auth: {
        user: "techbytes75@outlook.com",
        pass: "Techbytes@123"
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function SendEmail(token: string, receiver: string) {
    const qrCode = await QRCode.toBuffer(token);
    const imgId = "qrcode.techbytes";
    const content = (`
        <p>Your prescription token is <b>${token}</b></p>
        <h3>Your QR code</h3>
        <img src="${imgId}">
        <p>Please present this to your local pharmacist to receive your prescriptions.</p>
    `);

    const mailOptions: SendMailOptions = {
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
}

// POST: "/prescription"
const CreatePrescription: RequestHandler = async (req, res) => {
    const { _id } = req.user as IAccountUser;
    const { 
        prescriptionName, prescriptionDescription, prescriptionDate, 
        prescriptionContent, patientId
    } = req.body;

    try {
        const token = uuid();
        const newPrescription = new Prescription({
            prescriptionDate,
            prescriptionName,
            prescriptionDescription,
            prescriptionToken: token,
            prescriptionStatus: "Pending",
            prescriptionContent,
            patientId,
            doctorId: _id
        });

        await newPrescription.save();

        const patient = await AccountUser.findById(patientId, "email");
        if (patient) 
            await SendEmail(token, patient.email);

        res.status(200).end();
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export default CreatePrescription;