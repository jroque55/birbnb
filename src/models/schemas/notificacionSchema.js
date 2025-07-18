import mongoose from "mongoose"
import {Notificacion} from "../entities/notificacion.js"
//import usuarioSchema from "./usuarioSchema.js"

const notificacionSchema = new mongoose.Schema({
    mensaje: {
        type: String,
        trim: true,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    fechaAlta: {
        type: Date,
        default: Date.now 
    },
    leida: {
        type: Boolean,
        default: false
    }
})

notificacionSchema.loadClass(Notificacion)
export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);