import { catchAsync } from "../utils/catchAsync.js";

export class NotificacionController {
  constructor(notificacionService) {
    if (!notificacionService) {
      throw new Error("notificacionService es requerido");
    }
    this.notificacionService = notificacionService;
    this.obtenerNotificacionesNoLeidas = catchAsync(
      this.obtenerNotificacionesNoLeidas.bind(this)
    );
    this.obtenerNotificacionesLeidas = catchAsync(
      this.obtenerNotificacionesLeidas.bind(this)
    );
    this.marcarComoLeida = catchAsync(this.marcarComoLeida.bind(this));
  }

  async obtenerNotificaciones(req, res, next) {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; 
    const result = await this.notificacionService.obtenerNotificaciones(req.params.usuarioId, page, limit)
    console.log(result)
    res.status(200).json(result)
  }

  async obtenerNotificacionesNoLeidas(req, res, next) {
    const notificaciones =
      await this.notificacionService.obtenerNotificacionesNoLeidas(
        req.params.usuarioId
      );
    res.status(200).json(notificaciones);
  }

  async obtenerNotificacionesLeidas(req, res, next) {
    const notificaciones =
      await this.notificacionService.obtenerNotificacionesLeidas(
        req.params.usuarioId
      );
    res.status(200).json(notificaciones);
  }

  async marcarComoLeida(req, res, next) {
    await this.notificacionService.marcarComoLeida(req.params.notificacionId);
    res.status(204).send();
  }
}
