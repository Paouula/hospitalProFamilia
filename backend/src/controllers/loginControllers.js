//Importamos las dos tablas de los usuarios (patients y doctor)
import patientsModel from "../models/patients.js";
import doctorModel from "../models/doctor.js";
import bcrypt from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import {config} from "..//config.js";
     
const loginControllers = {};

loginControllers.login = async (req, res) =>{
    const {email, password} = req.body;

    try {

        let userFound; //Esta variable es para guardar el usuario encontrado
        let userType; //Para guardar el tipo de usuario encontrado

        //1.Admin
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "admin",
            userFound = {_id: "admin"}
        }else{
            //2.Empleado
            userFound = await employeesModel.findOne({email}),
            userType = "employee"

            if(!userFound){
                userFound = await customersModel.findOne({email})
                userType = "customer"
            }
        }

        //Usuario no encontrado
        if(!userFound){
            console.log("A pesar de buscar en todos lados, no existe")
            return res.json({message: "User not found"})
        }

        //Validar contraseña 
        //Solo si no es Admin
        if(userType !== "admin"){
            //Veamos si la contraseña que escribamos en el lobby es la misma que esta en la base de datos (Encriptada)
            const isMatch = await bcrypt.compare(password, userFound.password)
            if(!isMatch)
                return res.json({message: "Contraseña Incorrecta"})
        }

        //Token 
        jsonwebtoken.sign(
            //1.Que voy a guardar
            {id: userFound._id, userType},
            //2.Secreto
            config.JWT.secret,
            //3.Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4.Funcion flecha
            (error, token) => {
                if(error) console.log(error)

                    res.cookie("authToken", token)
                    res.json({message: "Login successful"})
            }
        )

        
    } catch (error) {
        res.json({message: error})
        
    }
}

export default loginControllers;

