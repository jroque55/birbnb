import { Usuario } from "../models/entities/usuario.js";
import {
  NotFoundError,
  ValidationError,
  ConflictError,
} from "../errors/AppError.js";
import { TipoUsuario } from "../utils/enums.js";
import bcrypt, { hash } from "bcrypt";

export class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.findAll();
    return usuarios.map((u) => this.toDTO(u));
  }

  async create(usuario) {
    const { nombre, email, password, tipo } = usuario;

    if (
      !nombre ||
      !email ||
      !password ||
      ![TipoUsuario.ANFITRION, TipoUsuario.HUESPED].includes(tipo)
    ) {
      throw new ValidationError(
        "Faltan campos requeridos o los datos no son validos"
      );
    }

    const existente = await this.usuarioRepository.findByEmail(email);
    if (existente) {
      throw new ConflictError(`Ya existe un usuario con ese email ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const nuevo = new Usuario(nombre, email, hashedPassword, tipo);

    const usuarioGuardado = await this.usuarioRepository.save(nuevo);
    return usuarioGuardado;
  }

  async delete(id) {
    const deleted = await this.usuarioRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundError(`Usuario con id ${id} no encontrado`);
    }
    return deleted;
  }

  async findById(id) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError(`Usuario con id ${id} no encontrado`);
    }
    return this.toDTO(usuario);
  }

  static async login({email, password}) {
    Validation.email(email)
    Validation.password(password)

    const user = await this.usuarioRepository.findByEmail({email})
    if(!user) throw new Error('El usuario no existe') 

    const isValid = bcrypt.compareSync(password, user.password)
    if(!isValid) throw new Error('La contraseña es invalida')

    return user.nombre
  }

  // toDTO(usuario) {
  //     return {
  //         id: usuario.id,
  //         nombre: usuario.nombre,
  //         email: usuario.email,
  //         password: usuario.password
  //         notificaciones: usuario.notificaciones,
  //         tipo: usuario.tipo
  //     }
  // }
}

class Validation {
    static email(email) {
        if(typeof email != 'string') throw new ValidationError('Email debe ser de tipo string')
        if(email.length < 3) throw new Error('El email es muy corto')        
    }
    static password(password) {
        if(typeof password != 'string') throw new ValidationError('La contraseña debe ser de tipo string')
        if(password.length < 7) throw new Error('La contraseña debe tener al menos 8 caracteres')
    }
    
}