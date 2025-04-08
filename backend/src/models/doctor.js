//Campos: name, specialty, email, password

import {Schema, model} from "mongoose";

const doctorSchema = Schema({
    name: {
        type: String,
        requiere: true
    },
    specialty: {
        type: String,
        requiere: true
    },
    email:{
        type: String,
            required: [true, "El correo electrónico es obligatorio"],
            trim: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Por favor ingrese un correo electrónico válido"]
    },
    password:{
        type: String,
        require: true,
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Doctor", doctorSchema);