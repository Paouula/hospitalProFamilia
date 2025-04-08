//Campos: name, age, email, password, phone, isVerified.

import {Schema, model} from "mongoose";

const patientsSchema = Schema({
    name: {
        type: String,
        requiere: true
    },
    age: {
        type: Number,
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
    },
    telephone:{
        type: String,
        require: true,
  
    },
    isVerifid:{
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Patients", patientsSchema);