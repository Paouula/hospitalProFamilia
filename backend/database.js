//Importar la libreria mongoose
import mongoose from "mongoose";
//Importo mi archivo config con todas las variables
import { config } from "./src/config.js";

//Guardo en una constante la url de mi base de datos

//1.Configurar la uri o dirrecion de la base de datos
const uri = "mongodb://localhost:27017/hospitalprofamilia";

//2.Conectar la base de datos 
mongoose.connect(config.db.URI);


//°|°|°|°|°|°|°|°|COMPROBAR QUE TODO FUNCIONE|°|°|°|°|°|°|°|°|°|//

//3.Creo una constante que es igual a la conexión
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected")
});

connection.on("disconnected", () => {
    console.log("DB is disconnected")
})

connection.on("error", (error) =>  {
    console.log("DB error")
})