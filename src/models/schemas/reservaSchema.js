import mongoose from "mongoose";
import { Reserva } from "../entities/reserva.js";
import { rangoFechasSchema } from "./rangoFechasSchema.js";
import { TipoEstadoReserva } from '../../utils/enums.js';
import { alojamientoSchema } from "./alojamientoSchema.js";

const reservaSchema = new mongoose.Schema({
    fechaAlta: { 
        type: Date, 
        default: Date.now 
    },
    huespedReservador: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    cantHuespedes: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    alojamiento: alojamientoSchema,
    rangoDeFechas: {
        fechaInicio: {
            type: Date,
            required: true
        },
        fechaFin: {
            type: Date,
            required: true
        }
    },
    estado: { 
        type: String, 
        enum: Object.values(TipoEstadoReserva), 
        default: TipoEstadoReserva.PENDIENTE 
    }
});

reservaSchema.loadClass(Reserva);
export const ReservaModel = mongoose.model('Reserva', reservaSchema);