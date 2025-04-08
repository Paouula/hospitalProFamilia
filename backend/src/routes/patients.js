import express from "express";
import patientsControllers from "../controllers/patientsControllers.js";

const router = express.Router();

router.route("/")
.get(patientsControllers.getPatients)
.post(patientsControllers.insertPatients)

router.route("/:id")
.put(patientsControllers.updatePatients)
.delete(patientsControllers.deletePatients)

export default router;