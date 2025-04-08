import express from "express";
import appointmentControllers from "../controllers/appointmentControllers.js";

const router = express.Router();

router.route("/")
.get(appointmentControllers.getAppointment)
.post(appointmentControllers.insertAppointment)

router.route("/:id")
.put(appointmentControllers.updateAppointment)
.delete(appointmentControllers.deleteAppointment)

export default router;