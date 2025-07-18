import mongoose from "mongoose"
import {RangoDeFechas} from "../entities/rangoDeFechas.js"

export const rangoFechasSchema = new mongoose.Schema({
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    }
},{
    _id: false 
}) 

//rangoFechasSchema.loadClass(RangoFechas)
export const RangoFechasModel = mongoose.model('RangoFechas', rangoFechasSchema)