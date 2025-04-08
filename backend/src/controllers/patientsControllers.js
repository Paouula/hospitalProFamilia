const patientsControllers = {};

import patients from "../models/patients.js";
import patientsModel from "../models/patients.js";

//SELECT
patientsControllers.getPatients = async (req, res) => {
    const patients = await patientsModel.find()
    res.json(patients)
}

//INSERT
patientsControllers.insertPatients = async (req, res) => {
    const {name, age, email, password, phone, isVerified} = req.body;
    const newPatients = new patientsModel({name, age, email, password, phone, isVerified})
    await newPatients.save()
    res.json({message: "Patients saved"})
}

//DELETE
patientsControllers.deletePatients = async (req, res) => {
    await patientsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Patients delete"})
}

//UPDATE
patientsControllers.updatePatients = async (req, res) => {
    const {name, age, email, password, phone, isVerified} = req.body;
    const updatePatients = await patientsModel.findByIdAndUpdate(req.params.id, 
        {name, age, email, password, phone, isVerified}, {new:true})
    res.json({message: "Patients update"})
}

export default patientsControllers;