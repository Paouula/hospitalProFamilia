//Campos: date, time, reason, idDoctor, idPatient.

import {Schema, model} from "mongoose";

const appointmentSchema = Schema({
    date: {
        type: Date,
        requiere: true
    },
    time: {
        type: String,
        requiere: true
    },
    reason:{
        type: String,
        required: true
    },
    idDoctor:{
        type: Schema.Types.ObjectId,
        ref: "doctor",
        requiere: true
    },
    idPatient:{
        type: Schema.Types.ObjectId,
        ref: "patients",
        requiere: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Appointment", appointmentSchema);