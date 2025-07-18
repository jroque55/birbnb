import mongoose from "mongoose"
import {Direccion} from "../entities/direccion.js"

export const direccionSchema = new mongoose.Schema({
    calle: {
        type: String,
        trim: true,
        required: true
    },
    altura: {
        type: Number,
        required: true,
        validate: {
            validator: function (numero) {
                return numero > 0 && numero <= 6000
            },
            message: "No es una altura correcta"
        }
    },
    ubicacion: {
        ciudad: {
            type: String,
            trim: true,
            required: true
        },
        pais: {
            type: String,
            trim: true,
            required: true
        }
    },
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    }
}, {
    _id: false
})

direccionSchema.loadClass(Direccion)

export const DireccionModel = mongoose.model('Direccion', direccionSchema)