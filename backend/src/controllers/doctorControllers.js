const doctorControllers = {};

import doctor from "../models/doctor.js";
import doctorModel from "../models/doctor.js";

//SELECT 
doctorControllers.getDoctor = async (req, res) => {
    const doctor = await doctorModel.find()
    res.json(doctor)
}

//INSERT
doctorControllers.insertDoctor = async (req, res) => {
    const {name, specialty, email, password} = req.body;
    const newDoctor = new doctorModel({name, specialty, email, password})
    await newDoctor.save()
    res.json({message: "Doctor saved"})
}

//DELETE
doctorControllers.deleteDoctor = async (req, res) => {
    await doctorModel.findByIdAndDelete(req.params.id)
    res.json({message: "Doctor delete"})
}

//UPDATE
doctorControllers.updateDoctor = async (req, res) => {
    const {name, specialty, email, password} = req.body;
    const updateDoctor = await doctorModel.findByIdAndUpdate(req.params.id, 
        {name, specialty, email, password}, {new:true})
    res.json({message: "Doctor update"})
}

export default doctorControllers;