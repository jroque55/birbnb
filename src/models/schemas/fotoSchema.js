import mongoose from "mongoose"
import {Foto} from "../entities/foto.js"

export const fotoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        trim: true
    },
    path: {
        type: String,
        required: true,
        trim: true
    }
})

fotoSchema.loadClass(Foto)

export const FotoModel = mongoose.model('Foto', fotoSchema)
