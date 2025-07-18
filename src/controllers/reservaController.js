import { catchAsync } from "../utils/catchAsync.js";

export class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService;
    this.findAll = catchAsync(this.findAll.bind(this));
    this.crearReserva = catchAsync(this.crearReserva.bind(this));
    this.obtenerReservasDeUsuario = catchAsync(
      this.obtenerReservasDeUsuario.bind(this)
    );
    this.cambiarEstadoReserva = catchAsync(
      this.cambiarEstadoReserva.bind(this)
    );
    this.cambiarFechaReserva = catchAsync(this.cambiarFechaReserva.bind(this));
    this.findById = catchAsync(this.findById.bind(this));
    this.obtenerReservasAnfitrion = catchAsync(
      this.obtenerReservasAnfitrion.bind(this)
    );
  }

  async findAll(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await this.reservaService.findAll(page, limit);
    console.log(result);
    res.json(result);
  }

  async crearReserva(req, res, next) {
    const nuevo = await this.reservaService.crearReserva(req.body);
    res.status(201).json(nuevo);
  }

  async obtenerReservasDeUsuario(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    console.log(req.params.usuarioId)
    try{
    const reservas = await this.reservaService.obtenerReservasDeUsuario(
      req.params.usuarioId,
      page,
      limit
    );
    console.log(reservas)
    console.log(reservas.data);
    res.status(200).json(reservas);
  }catch(error) {
    next(error)
  }
  }

  async cambiarEstadoReserva(req, res, next) {
    const { reservaId } = req.params;
    const { nuevoEstado } = req.body;
    const reservaActualizada = await this.reservaService.cambiarEstadoReserva(
      reservaId,
      nuevoEstado
    );
    res.status(204).json(reservaActualizada);
  }

  async cambiarFechaReserva(req, res) {
    const { reservaId } = req.params;
    const { nuevoRango } = req.body;
    await this.reservaService.cambiarFechaReserva(reservaId, nuevoRango);
    res.status(204).send();
  }

  async findById(req, res, next) {
    console.log(req.params.reservaId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    try {
      const result = await this.reservaService.findById(
        req.params.reservaId,
        page,
        limit
      );
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async obtenerReservasAnfitrion(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const { anfitrionId } = req.params;
    try {
      const result = await this.reservaService.obtenerReservasPorAnfitrion(
        anfitrionId,
        page,
        limit
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
