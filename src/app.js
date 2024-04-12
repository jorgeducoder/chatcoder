import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

// inicio motor de plantillas
app.engine("handlebars", handlebars.engine());

// Establezco la ruta de las vistas
app.set("views", `${__dirname}/views`);

// Establezco el motor de renderizado
app.set("view engine", "handlebars");

// Establezco el servidor estatico de archvos.En las diapo public esta dentro de src pero deberia estar aparte porque son archivos publicos que no deberian mezclarse
app.use(express.static(`${__dirname}/../public`));

// Antes de poner a correr el servidor utilizo en la ruta base mi grupo de views routes
app.use("/", viewsRouter);

// Inicio mi servidor HTTP y lo almacno en una constante
const PORT = 8080;
const BASE_URL = "http://localhost"
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en ${BASE_URL}:${PORT}`);
});


// Inicio el servidor socket y lo llamo io porque asi se llama la funcion de socket

const io = new Server(httpServer);

// Definimos array para guardar los mensajes recibidos
const messages = [];

// pongo a escuchar mi servidor
io.on("connection", socket => {
    // El servidor socket guarda la id de cada cliente que se comunica
    console.log("Nuevo cliente conectado: ", socket.id);

    socket.on("message", data => {
        //console.log(`Mensaje: ${data.message}`);
        // guardo y emito todos los mensajes recibidos
        messages.push(data);
        io.emit("messagesLogs", messages)

    });
});

