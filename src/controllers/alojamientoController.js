import { catchAsync } from "../utils/catchAsync.js";

export class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
    this.findAll = catchAsync(this.findAll.bind(this));
    this.create = catchAsync(this.create.bind(this));
    this.delete = catchAsync(this.delete.bind(this));
  }

  async findAll(req, res) {
    
    const filters = {
      personLimit: req.query.personLimit,
      caracteristica: req.query.caracteristica ? req.query.caracteristica.split(',') : undefined,
      ubication: req.query.ubication,
      precioLt: req.query.precioLt,
      precioGt: req.query.precioGt,
      pais: req.query.pais,
      ciudad: req.query.ciudad,
      fechaInicio: req.query.fechaInicio,
      fechaFin: req.query.fechaFin
    };
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; 
    
    const result = await this.alojamientoService.findAll(filters, page, limit);
    
    res.json(result);
  }


  async create(req, res) {
    const nuevo = await this.alojamientoService.create(req.body);
    res.status(201).json(nuevo);
  }

  async delete(req, res) {
    await this.alojamientoService.delete(req.params.id);
    res.status(204).send();
  }

  async findById(req, res) {
    const alo = await this.alojamientoService.findById(req.params.id)
    res.status(200).json(alo)
  }

}
