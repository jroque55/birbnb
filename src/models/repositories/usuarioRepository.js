import { ValidationError } from '../../errors/AppError.js';
import {UsuarioModel} from '../schemas/usuarioSchema.js'
import Types from 'mongoose'

export class UsuarioRepository {

  constructor() {
    this.model = UsuarioModel;
  }

  async findAll() {
    const usuarios = await this.model.find()
    return usuarios
  }

  // Obtener usuario
   async obtenerUsuario(usuarioId) {
    return UsuarioModel.findOne(
      { usuarioId })
  }

  // Marcar como leída
  async marcarComoLeido(nombre, notificationId) {
    return UsuarioModel.updateOne(
      { 
        nombre, 
        'notificaciones._id': notificationId 
      },
      { 
        $set: { 
          'notificaciones.$.leido': true 
        } 
      }
    );
  }

  async save(usuario) {
    const query = usuario.id ? {_id: usuario.id} : {_id: new this.model()._id}
    return await this.model.findOneAndUpdate(
      query,
      usuario,
      {
          new: true,
          runValidators: true,
          upsert: true
      }
    ).populate('email');
  }

  async deleteById(id) {
    const resultado = await this.model.findByIdAndDelete(id);
    return resultado !== null;
  }

  async findByEmail(email) {
    return await this.model.findOne({email})
  }

  async findById(id) {
    return await this.model.findById(id)
  }

}

