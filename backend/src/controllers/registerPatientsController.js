import jsonwebToken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar
import nodemailer from "nodemailer"; //Enviar correo
import crypto from "crypto"; //Codigo aleatorio

import patientsModel from "../models/patients.js";
import {config} from "../config.js";
import { error } from "console";