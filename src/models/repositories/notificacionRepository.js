import { NotificacionModel } from '../schemas/notificacionSchema.js'


export class NotificacionRepository {
   constructor() {
        this.model = NotificacionModel;
    }


   async obtenerNotificaciones(usuarioId, page, limit) {
    const skip = (page - 1) * limit;
  
    const totalDocuments = await this.model.countDocuments({usuario: usuarioId});
    
    const notificaciones = await this.model.find({
      usuario: usuarioId
    }).limit(limit).skip(skip).populate('usuario').exec();
  
    const totalPages = Math.ceil(totalDocuments / limit);
    const NextPage = page < totalPages;
    const PrevPage = page > 1;

    return {
      data: notificaciones,
      pagination: {
        currentPage: page,
        totalPages,
        totalDocuments,
        NextPage,
        PrevPage,
        limit,
        skip
      }
    }
  }

  async obtenerNotificacionesNoLeidas(usuarioId) {
    return this.model.find({usuario: usuarioId, leida: false}).populate('usuario')
  }

  async obtenerNotificacionesLeidas(usuarioId) {
    return this.model.find({
      usuario: usuarioId,
      leida: true
    }).populate('usuario').exec();
  }

  async findById(notificacionId) {
    return this.model.findById(notificacionId)
  }

}

