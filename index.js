import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from "./server.js";
import { client } from "./src/config/database.js";

import { AlojamientoRepository } from "./src/models/repositories/alojamientoRepository.js";
import { AlojamientoService } from "./src/services/alojamientoService.js";
import { AlojamientoController } from "./src/controllers/alojamientoController.js";

import { ReservaRepository } from "./src/models/repositories/reservaRepository.js";
import { ReservaService } from "./src/services/reservaService.js";
import { ReservaController } from "./src/controllers/reservaController.js";
import { UsuarioService } from "./src/services/usuarioService.js";
import { UsuarioController } from "./src/controllers/usuarioController.js";
import { UsuarioRepository } from "./src/models/repositories/usuarioRepository.js";

import { NotificacionRepository } from "./src/models/repositories/notificacionRepository.js";
import { NotificacionService } from "./src/services/notificacionService.js";
import { NotificacionController } from "./src/controllers/notificacionController.js";
import routes from "./src/routes/routes.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);

client.connect();

const usuarioRepo = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepo);
const usuarioController = new UsuarioController(usuarioService);

const reservaRepo = new ReservaRepository();
const alojamientoRepo = new AlojamientoRepository(reservaRepo);
const alojamientoService = new AlojamientoService(alojamientoRepo, usuarioRepo);
const alojamientoController = new AlojamientoController(alojamientoService);

const notificacionRepo = new NotificacionRepository();
const notificacionService = new NotificacionService(notificacionRepo, usuarioRepo);
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, usuarioRepo, notificacionService);
const notificacionController = new NotificacionController(notificacionService);
const reservaController = new ReservaController(reservaService);

server.setController(AlojamientoController, alojamientoController);

server.setController(ReservaController, reservaController);

server.setController(UsuarioController, usuarioController)
server.setController(NotificacionController, notificacionController);

routes.forEach(r => {
    server.addRoute(r)
})

server.configureRoutes();
server.launch();