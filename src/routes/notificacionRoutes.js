import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificaciones(app, getController) {
  app.get("/notificaciones/:usuarioId/no-leidas", (req, res, next) =>
    getController(NotificacionController).obtenerNotificacionesNoLeidas(req, res, next)
  );

  app.get("/notificaciones/:usuarioId/leidas", (req, res, next) =>
    getController(NotificacionController).obtenerNotificacionesLeidas(req, res, next)
  );

  app.get("/notificaciones/:usuarioId", (req, res, next) => 
    getController(NotificacionController).obtenerNotificaciones(req,res,next)
  )

  app.patch("/notificaciones/:notificacionId", (req, res, next) =>
    getController(NotificacionController).marcarComoLeida(req, res, next)
  );
}