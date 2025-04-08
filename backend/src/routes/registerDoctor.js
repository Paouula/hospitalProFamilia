import express from "express";
import registerDoctorController from "../controllers/registerDoctorController.js";

const router = express.Router();

router.route("/").post(registerDoctorController.register)

export default router;
