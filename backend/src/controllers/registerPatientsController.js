import jsonwebToken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar
import nodemailer from "nodemailer"; //Enviar correo
import crypto from "crypto"; //Codigo aleatorio

import patientsModel from "../models/patients.js";
import {config} from "../config.js";
import { error } from "console";

//Array de funciones
const registerPatientsController = {};

registerPatientsController.register = async (req, res) => {
    //1.Socilitar los datos que vamos a registrar 
    const {  
        name, 
        age, 
        email, 
        password, 
        phone, 
        isVerified
    } = req.body;

    try {
        const existingPatients = await patientsModel.findOne({email})
        if(existingPatients){
            return res.json({message: "Patients alredy exist"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardar el paciente en la base de datos
        const newPatients = new patientsModel({
            name, 
            age, 
            email, 
            password: passwordHash, 
            phone, 
            isVerified : isVerified || false
        });

        await newPatients.save();

        //Generar un codigo aleatorio para enviarlo por correo
        const verificationCode = crypto.ramdonBytes(3).toString("hex")

        //Generar un token que contenga el codigo de verificacion
        const tokeCode = jsonwebtoken.sign(
            //1.¿Qué voy a guardar?
            {email, verificationCode},
            //Secret key
            config.JWT.secret,
            //3.Cuando expira
            {expireIn: "2h"}
        )

    res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000})

    //Enviar el correo electronico
    //1.Transporter o quien lo envia
    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: config.email.email_user,
            pass: config.email.email_pass
        }
    });

    //2.mailoption => Quien lo recibe
    const mailoptions = {
        from: config.email.email_user,
        to: email,
        subject: "Verificación de correo",
        text: "Para verificar tu cuenta, utiliza el siguiente codigo:" + verificationCode + "\n expira en dos horas"
    };

    //3.Enviar el correo
    transporter.sendMeil(mailoptions, (req, info) => {
        if (error) {
            return res.json({message: "Error sending email" + error});
            }
            console.log("Email sent" + info);
        }
    );

    res.json({
        message: "Patients registered, Please verify your email with  the code sent",
    });

    }catch (error) {
        console.log("error" + error);
    }
};

registerPatientsController.verifyCodeEmail = async (req, res) => {
    const {requireCode} = req.body;

    //obtengo el token guardado en las cookies
    const token = req.cookies.verificationToken;

    try {

        //Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, comfig.JWT.secret)
        const {email, verificationCode: storeCode} = decoded;

        //Comparar el código que envié por correo y está guardado
        //en las cookies, con el código que el usuario
        //esta ingresando
        if(requireCode !== storedCode){
            return res.json({message: "Invalid code"})
        }

        //Marcamos al cliente como verificado
        const patients = await patientsModel.findOne({email});
        patients.isVerified = true;
        await patients.save();

        res.clearCookie("verificationToken");
        res.json({message: "Email verified Successfuly"})

    } catch (error) {
        console.log("error" + error);
    }
};

export default registerPatientsController;