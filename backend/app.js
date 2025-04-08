import express from "express";
import doctorRoutes from "./src/routes/doctor.js";
import patientsRoutes from "./src/routes/patients.js";
import appointmentRoutes from "./src/routes/appointment.js";

import cookieParser from "cookie-parser";
import registerDoctorRoutes from "./src/routes/registerDoctor.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerPatientsRoutes from "./src/routes/registerpatients.js";


const app = express();

app.use(express.json());
app.use(cookieParser());


//Exportar constante para usar express en todos lados 
app.use("/api/doctor", doctorRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/appointment", appointmentRoutes);

app.use("/api/registerDoctor", registerDoctorRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registerPatients", registerPatientsRoutes);

export default app;