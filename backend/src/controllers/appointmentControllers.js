const appointmentControllers = {};

import appointment from "../models/appointment.js";
import appointmentModel from "../models/appointment.js";

//SELECT
appointmentControllers.getAppointment = async (req, res) => {
    const Appointment = await appointmentModel.find()
    res.json(appointment)
}

//INSERT
appointmentControllers.insertAppointment = async (req, res) => {
    const {date, time, reason, idDoctor, idPatient} = req.body;
    const newAppointment = new appointmentModel({date, time, reason, idDoctor, idPatient})
    await newAppointment.save()
    res.json({message: "Appointment saved"})
}

//DELETE
appointmentControllers.deleteAppointment = async (req, res) => {
    await appointmentModel.findByIdAndDelete(req.params.id)
    res.json({message: "Appointment delete"})
}

//UPDATE
appointmentControllers.updateAppointment = async (req, res) => {
    const {date, time, reason, idDoctor, idPatient} = req.body;
    const updateAppointment = await appointmentModel.findByIdAndUpdate(req.params.id, 
        {date, time, reason, idDoctor, idPatient}, {new:true})
    res.json({message: "Appointment update"})
}

export default appointmentControllers;