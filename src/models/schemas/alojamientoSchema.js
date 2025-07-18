import {direccionSchema} from "./direccionSchema.js"

import mongoose from "mongoose"
import {Alojamiento} from "../entities/alojamiento.js"
import {TipoMoneda, TipoCaracteristica} from "../../utils/enums.js"
import {fotoSchema} from "./fotoSchema.js"

export const alojamientoSchema = new mongoose.Schema ({
    idAnfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    precioPorNoche: {
        type: Number,
        required: true
    },
    moneda: {
        type: String,
        enum: Object.values(TipoMoneda),
        required: true
    },
    horarioCheckIn: {
        type: String
    },
    horarioCheckOut: {
        type: String
    },
    direccion: direccionSchema,
    cantHuespedesMax: {
        type: Number,
        min: 1,
        required: true
    },
    caracteristicas: [{
        type: String,
        enum: Object.values(TipoCaracteristica),
        required: true
    }],
    fotos: [fotoSchema]
})

alojamientoSchema.loadClass(Alojamiento)

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);