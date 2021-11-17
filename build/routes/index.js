"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const _protect_1 = __importDefault(require("./_protect"));
const page_router_1 = __importDefault(require("./page_router"));
// #region Controllers
const LoginController_1 = require("../controllers/AuthControllers/LoginController");
const LogoutController_1 = __importDefault(require("../controllers/AuthControllers/LogoutController"));
const CreateUserController_1 = __importDefault(require("../controllers/UserControllers/CreateUserController"));
const ViewSelfController_1 = __importDefault(require("../controllers/UserControllers/ViewSelfController"));
const ViewUserController_1 = __importDefault(require("../controllers/UserControllers/ViewUserController"));
const UpdateSelfController_1 = __importDefault(require("../controllers/UserControllers/UpdateSelfController"));
const UpdateUserController_1 = __importDefault(require("../controllers/UserControllers/UpdateUserController"));
const ListUsersController_1 = __importDefault(require("../controllers/UserControllers/ListUsersController"));
const ListPatientsController_1 = __importDefault(require("../controllers/UserControllers/ListPatientsController"));
const ViewPrescriptionController_1 = __importDefault(require("../controllers/PrescriptionControllers/ViewPrescriptionController"));
const ViewPrescriptionByTokenController_1 = __importDefault(require("../controllers/PrescriptionControllers/ViewPrescriptionByTokenController"));
const CreatePrescriptionController_1 = __importDefault(require("../controllers/PrescriptionControllers/CreatePrescriptionController"));
const UpdatePrescriptionController_1 = __importDefault(require("../controllers/PrescriptionControllers/UpdatePrescriptionController"));
const UpdatePrescriptionStatusController_1 = __importDefault(require("../controllers/PrescriptionControllers/UpdatePrescriptionStatusController"));
const DeletePrescriptionController_1 = __importDefault(require("../controllers/PrescriptionControllers/DeletePrescriptionController"));
const DoctorListPrescriptionsController_1 = __importDefault(require("../controllers/PrescriptionControllers/DoctorListPrescriptionsController"));
const DoctorListPrescriptionsByPatientController_1 = __importDefault(require("../controllers/PrescriptionControllers/DoctorListPrescriptionsByPatientController"));
const PatientListPrescriptionsController_1 = __importDefault(require("../controllers/PrescriptionControllers/PatientListPrescriptionsController"));
const CreateMedicineController_1 = __importDefault(require("../controllers/MedicineControllers/CreateMedicineController"));
const DeleteMedicineController_1 = __importDefault(require("../controllers/MedicineControllers/DeleteMedicineController"));
const ListMedicinesController_1 = __importDefault(require("../controllers/MedicineControllers/ListMedicinesController"));
// #endregion
const router = express_1.default.Router();
// Index page.
router.get("/", (0, _protect_1.default)(), page_router_1.default);
// Login and Logout.
router.get("/login", LoginController_1.View);
router.post("/login", passport_1.default.authenticate("local"));
router.post("/logout", (0, _protect_1.default)(), LogoutController_1.default);
// User view and update profile.
router.get("/user", (0, _protect_1.default)(), ViewSelfController_1.default);
router.put("/user", (0, _protect_1.default)(), UpdateSelfController_1.default);
// Patient list prescriptions of self.
router.get("/prescriptions/patient", (0, _protect_1.default)("Patient"), PatientListPrescriptionsController_1.default);
// Doctor list patients.
// Doctor list prescriptions by self or of patient.
// Doctor view, create, update and delete prescription.
router.get("/patients", (0, _protect_1.default)("Doctor"), ListPatientsController_1.default);
router.get("/prescriptions/doctor", (0, _protect_1.default)("Doctor"), DoctorListPrescriptionsController_1.default);
router.get("/prescriptions/patient/:id", (0, _protect_1.default)("Doctor"), DoctorListPrescriptionsByPatientController_1.default);
router.get("/prescription/:id", (0, _protect_1.default)("Doctor", "Patient"), ViewPrescriptionController_1.default);
router.post("/prescription", (0, _protect_1.default)("Doctor"), CreatePrescriptionController_1.default);
router.put("/prescription/:id", (0, _protect_1.default)("Doctor"), UpdatePrescriptionController_1.default);
router.delete("/prescription/:id", (0, _protect_1.default)("Doctor"), DeletePrescriptionController_1.default);
// Pharmacist view prescription by token.
// Pharmacist update prescription status.
router.get("/prescription/token/:token", (0, _protect_1.default)("Pharmacist"), ViewPrescriptionByTokenController_1.default);
router.put("/prescription/status/:id", (0, _protect_1.default)("Pharmacist"), UpdatePrescriptionStatusController_1.default);
// Pharmacist list medicines.
// Pharmacist create and delete medicine.
router.get("/medicines", (0, _protect_1.default)("Pharmacist", "Doctor"), ListMedicinesController_1.default);
router.post("/medicine", (0, _protect_1.default)("Pharmacist"), CreateMedicineController_1.default);
router.delete("/medicine/:id", (0, _protect_1.default)("Pharmacist"), DeleteMedicineController_1.default);
// Admin list profiles.
// Admin view, create and update profile.
router.get("/users", (0, _protect_1.default)("Admin"), ListUsersController_1.default);
router.get("/user/:id", (0, _protect_1.default)("Admin", "Doctor"), ViewUserController_1.default);
router.post("/register", (0, _protect_1.default)("Admin"), CreateUserController_1.default);
router.put("/user/:id", (0, _protect_1.default)("Admin"), UpdateUserController_1.default);
module.exports = router;
