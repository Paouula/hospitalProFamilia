import doctorModel from "../models/doctor.js";
import bcryptjs from "bcryptjs"; //Encripta la contraseña
import jsonwebtoken from "jsonwebtoken"; //Token
import {config} from "../config.js"

const registerDoctorController = {};

registerDoctorController.register = async (req, res) => {
    const {name, specialty, email, password} = req.body;

    try {
        //Verificamos si el doctor ya existe
        const exisDoctor = await doctorModel.findOne({email})
        if(exisDoctor) {
            return res.json ({message: "Doctor ya existente"})
        }
           
        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardemos al empleado nuevo
        const newDoctor = new employeesModel({
            name, 
            specialty,
            email, 
            password: passwordHash})

            await newDoctor.save();

            //Token
            jsonwebtoken.sign(
                //1.Que voy a guardar
                {id: newDoctor._id},
                //2.Secreto
                config.JWT.secret,
                //3.Cuando expira
                {expiresIn: config.JWT.expiresIn},
                //4.Funcion flecha
                (error, token) => {
                    if(error) console.log(error);
                        res.cookie("authToken", token);
                    res.json({message: "Doctor Registrado"})
                }
            )
    
    } catch (error) {
        console.log(error)
    }
}

export default registerDoctorController;