import conectDB from "./db.js";
import { PORT } from "./config.js";
import app from "./app.js";

//Conexiona la base de datos configurada en db.js
conectDB();

//Puerto de conexion al servidor
app.listen(PORT);
console.log("Server is running on port", PORT);
