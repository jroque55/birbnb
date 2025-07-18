import mongoose, { mongo } from "mongoose"
import {Usuario}from "../entities/usuario.js"
import {TipoUsuario} from "../../utils/enums.js"


const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (nombre) {
                return nombre.length >= 3
            },
            message: "El nombre debe tener al menos 3 caracteres"
        }
    },
    notificaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notificacion'
  }],
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return password.length > 7
            },
            message: "Se necesitan minimo 8 caracteres"
        }
    },
    tipo: {
        type: String,
        enum: Object.values(TipoUsuario),
        required: true,
    }

})

usuarioSchema.loadClass(Usuario)
export const UsuarioModel = mongoose.model('Usuario', usuarioSchema)
