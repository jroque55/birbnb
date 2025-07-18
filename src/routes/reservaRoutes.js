import { ReservaController } from "../controllers/reservaController.js";

export function registerReservaRoutes(app, getController) {
  app.get("/reservas", (req, res, next) =>
    getController(ReservaController).findAll(req, res, next)
  );
  
  app.get("/reservas/:reservaId", (req, res, next) => 
    getController(ReservaController).findById(req, res, next)
  )

  app.post("/reservas", (req, res, next) =>
    getController(ReservaController).crearReserva(req, res, next)
  );

  app.get("/reservas/usuarios/:usuarioId", (req, res, next) =>
    getController(ReservaController).obtenerReservasDeUsuario(req, res, next)
  );

  app.patch("/reservas/:reservaId/estado", (req, res, next) =>
    getController(ReservaController).cambiarEstadoReserva(req, res, next)
  );

  app.patch("/reservas/:reservaId/fecha", (req, res, next) =>
    getController(ReservaController).cambiarFechaReserva(req, res, next)
  );

  app.get("/reservas/anfitriones/:anfitrionId", (req, res, next) =>
    getController(ReservaController).obtenerReservasAnfitrion(req, res, next)
  );
}
