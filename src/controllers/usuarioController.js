import { catchAsync } from "../utils/catchAsync.js";

export class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
    this.create = catchAsync(this.create.bind(this));
    this.delete = catchAsync(this.delete.bind(this));
  }

  async findAll(req, res, next) {
    try {
      const usuarios = await this.usuarioService.findAll();
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const nuevo = await this.usuarioService.create(req.body);
    res.status(201).json(nuevo);
  }

  async delete(req, res, next) {
    await this.usuarioService.delete(req.params.id);
    res.status(204).send();
  }
}
