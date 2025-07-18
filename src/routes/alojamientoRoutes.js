import {catchAsync}from '../utils/catchAsync.js';
import { AlojamientoController } from "../controllers/alojamientoController.js";

export function registerAlojamientoRoutes(app, getController) {
  app.get("/alojamientos",catchAsync((req, res, next) => getController(AlojamientoController).findAll(req, res, next)));

  app.post("/alojamientos",catchAsync((req, res, next) => getController(AlojamientoController).create(req, res, next)));

  app.get("/alojamientos/:id", catchAsync((req, res, next) => getController(AlojamientoController).findById(req,res,next)))

  app.delete("/alojamientos/:id", catchAsync((req, res, next) => getController(AlojamientoController).delete(req, res, next)));
}
