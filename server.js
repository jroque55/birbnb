import express from "express";
import { configureRoutes } from "./src/routes/index.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: ['http://localhost:3001', 'https://front-m56bqxu1l-kevins-projects-2b27016c.vercel.app'],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export class Server {
  #controllers = {};
  #routes = []
  #app;

  constructor(app, port = 3000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
    this.#app.use(cookieParser())
    this.#app.use(cors(corsOptions));;
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  configureRoutes() {
    configureRoutes(this.app, this.getController.bind(this));
    
    // Middleware para manejar rutas no encontradas
    this.#app.use((req, res, next) => {
      res.status(404).json({
        status: 'fail',
        message: "La ruta solicitada no existe"
      });
    });

    // Middleware global de manejo de errores
    this.#app.use(errorHandler);
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }

  addRoute(route) {
    this.#routes.push(route)
    this.#app.use(route); 
  }

}
