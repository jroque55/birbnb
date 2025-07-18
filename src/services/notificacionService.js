import { NotificacionModel } from "../models/schemas/notificacionSchema.js";

export class NotificacionService {

    constructor(notificacionRepository, usuarioRepository) {
         if (!notificacionRepository || !usuarioRepository) {
      throw new Error('Los repositorios son requeridos');
    }
        this.notificacionRepository = notificacionRepository
        this.usuarioRepository = usuarioRepository
    }


    async obtenerNotificaciones(usuarioId, page, limit) {
        const usuario = await this.usuarioRepository.findById(usuarioId)
        if(!usuario) {
            throw new Error('No existe un usuario con ese nombre')
        }
        const result =  await this.notificacionRepository.obtenerNotificaciones(usuarioId,page,limit)
        console.log(result)
        return {
            data: result.data,
            pagination: result.pagination
        }
        
    }

    async obtenerNotificacionesNoLeidas(usuarioId) {
        const usuario = await this.usuarioRepository.findById(usuarioId)
        if(!usuario) {
            throw new Error('No existe un usuario con ese nombre')
        }
        return this.notificacionRepository.obtenerNotificacionesNoLeidas(usuarioId)
    }

    async obtenerNotificacionesLeidas(usuarioId) {
        const usuario = await this.usuarioRepository.findById(usuarioId)
        if(!usuario) {
            throw new Error('No existe un usuario con ese nombre')
        }
        return this.notificacionRepository.obtenerNotificacionesLeidas(usuarioId, true)
    }

    async marcarComoLeida(notificacionId) {
        const notificacion = await this.notificacionRepository.findById(notificacionId)
        if (!notificacion) {
            throw new Error('No existe la notificacion')
        }

        notificacion.leida = true
        await notificacion.save()
        return notificacion;
    }

    async crearNotificacion(mensaje, usuario) {
        const notificacion = new NotificacionModel({mensaje : mensaje, usuario : usuario})
        return await notificacion.save();
    } 

}

