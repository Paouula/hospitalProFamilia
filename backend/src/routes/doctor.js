import express from "express";
import doctorControllers from "../controllers/doctorControllers.js";

const router = express.Router();

router.route("/")
.get(doctorControllers.getDoctor)
.post(doctorControllers.insertDoctor)

router.route("/:id")
.put(doctorControllers.updateDoctor)
.delete(doctorControllers.deleteDoctor)

export default router;