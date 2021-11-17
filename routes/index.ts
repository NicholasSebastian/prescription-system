import express from "express";
import passport from "passport";
import requireAuth from "./_protect";
import PageRouter from "./page_router";

// #region Controllers
import { View as ViewLoginController } from "../controllers/AuthControllers/LoginController";
import LogoutController from "../controllers/AuthControllers/LogoutController";
import CreateUserController from "../controllers/UserControllers/CreateUserController";
import ViewSelfController from "../controllers/UserControllers/ViewSelfController";
import ViewUserController from "../controllers/UserControllers/ViewUserController";
import UpdateSelfController from "../controllers/UserControllers/UpdateSelfController";
import UpdateUserController from "../controllers/UserControllers/UpdateUserController";
import ListUsersController from "../controllers/UserControllers/ListUsersController";
import ListPatientsController from "../controllers/UserControllers/ListPatientsController";
import ViewPrescriptionController from "../controllers/PrescriptionControllers/ViewPrescriptionController";
import ViewPrescriptionByTokenController from "../controllers/PrescriptionControllers/ViewPrescriptionByTokenController";
import CreatePrescriptionController from "../controllers/PrescriptionControllers/CreatePrescriptionController";
import UpdatePrescriptionController from "../controllers/PrescriptionControllers/UpdatePrescriptionController";
import UpdatePrescriptionStatusController from "../controllers/PrescriptionControllers/UpdatePrescriptionStatusController";
import DeletePrescriptionController from "../controllers/PrescriptionControllers/DeletePrescriptionController";
import DoctorListPrescriptionsController from "../controllers/PrescriptionControllers/DoctorListPrescriptionsController";
import DoctorListPrescriptionsByPatientController from "../controllers/PrescriptionControllers/DoctorListPrescriptionsByPatientController";
import PatientListPrescriptionsController from "../controllers/PrescriptionControllers/PatientListPrescriptionsController";
import CreateMedicineController from "../controllers/MedicineControllers/CreateMedicineController";
import DeleteMedicineController from "../controllers/MedicineControllers/DeleteMedicineController";
import ListMedicinesController from "../controllers/MedicineControllers/ListMedicinesController";
// #endregion

const router = express.Router();

// Index page.
router.get("/", requireAuth(), PageRouter);

// Login and Logout.
router.get("/login", ViewLoginController);
router.post("/login", passport.authenticate("local"));
router.post("/logout", requireAuth(), LogoutController);

// User view and update profile.
router.get("/user", requireAuth(), ViewSelfController);
router.put("/user", requireAuth(), UpdateSelfController);

// Patient list prescriptions of self.
router.get("/prescriptions/patient", requireAuth("Patient"), PatientListPrescriptionsController);

// Doctor list patients.
// Doctor list prescriptions by self or of patient.
// Doctor view, create, update and delete prescription.
router.get("/patients", requireAuth("Doctor"), ListPatientsController);
router.get("/prescriptions/doctor", requireAuth("Doctor"), DoctorListPrescriptionsController);
router.get("/prescriptions/patient/:id", requireAuth("Doctor"), DoctorListPrescriptionsByPatientController);
router.get("/prescription/:id", requireAuth("Doctor", "Patient"), ViewPrescriptionController);
router.post("/prescription", requireAuth("Doctor"), CreatePrescriptionController);
router.put("/prescription/:id", requireAuth("Doctor"), UpdatePrescriptionController);
router.delete("/prescription/:id", requireAuth("Doctor"), DeletePrescriptionController);

// Pharmacist view prescription by token.
// Pharmacist update prescription status.
router.get("/prescription/token/:token", requireAuth("Pharmacist"), ViewPrescriptionByTokenController);
router.put("/prescription/status/:id", requireAuth("Pharmacist"), UpdatePrescriptionStatusController);

// Pharmacist list medicines.
// Pharmacist create and delete medicine.
router.get("/medicines", requireAuth("Pharmacist", "Doctor"), ListMedicinesController);
router.post("/medicine", requireAuth("Pharmacist"), CreateMedicineController);
router.delete("/medicine/:id", requireAuth("Pharmacist"), DeleteMedicineController);

// Admin list profiles.
// Admin view, create and update profile.
router.get("/users", requireAuth("Admin"), ListUsersController);
router.get("/user/:id", requireAuth("Admin", "Doctor"), ViewUserController);
router.post("/register", requireAuth("Admin"), CreateUserController);
router.put("/user/:id", requireAuth("Admin"), UpdateUserController);

module.exports = router;
