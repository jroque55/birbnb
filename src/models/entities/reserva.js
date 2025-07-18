import { TipoEstadoReserva } from "../../utils/enums.js";

export class Reserva {
    constructor(huespedReservador, cantHuespedes, alojamiento, rangoDeFechas) {
        this.fechaAlta = Date(),
        this.huespedReservador = huespedReservador,
        this.cantHuespedes = cantHuespedes,
        this.alojamiento = alojamiento,
        this.rangoDeFechas = rangoDeFechas,
        this.estado = TipoEstadoReserva.PENDIENTE
        //this.precioPorNoche = precioPorNoche,
        //this.historialCambios = []
    }

    actualizarEstado(cambioEstadoReserva) {
        this.estado = cambioEstadoReserva.estado
        //Lo dejo así, pero en este caso reserva usa a acambioEstadoReserva, distinto a lo planteado en el diagrama
        this.historialCambios.push(cambioEstadoReserva)
    }

    estasCancelada(){
        return this.estado == TipoEstadoReserva.CANCELADA
    }

    estoyDisponible(fechaInicio, fechaFin){
        return !this.rangoFechas.estaEnRango(fechaInicio, fechaFin)
    }   


    /*    fechaInicio(){
        return this.fechaInicio
    }

    fechaFin(){
        return this.fechaFin
    }

    estoyDisponible(fechaInicio, fechaFin){
        return this.rangoFechas.fechaInicio > fechaFin || this.rangoFechas.fechaFin < fechaInicio
    } */
}
