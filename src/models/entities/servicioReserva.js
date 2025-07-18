import { TipoEstadoReserva } from "../../utils/enums.js";
import { Reserva } from "./reserva.js";
import { CambioEstadoReserva } from "./cambioEstadoReserva.js";

export class ServicioReserva {

    constructor(servicioNotificacion){
        this.servicioNotificacion = servicioNotificacion
    }

    crearReserva(huesped, cantidad, alojamiento, rangoFechas, precioPorNoche){
        const reserva = new Reserva(huesped, cantidad, alojamiento, rangoFechas, precioPorNoche)
        this.servicioNotificacion.notificarNuevaReserva(reserva) 
        reserva.alojamiento.agregarReserva(reserva)
    }

    // TODO revisar si pasa igual que en servNot
    aceptarReserva(reserva){
        const cambioEstadoReserva = new CambioEstadoReserva(TipoEstadoReserva.CONFIRMADA, reserva, 
            "La reserva satisface todas las condiciones", reserva.alojamiento.anfitrion)
        
        reserva.actualizarEstado(cambioEstadoReserva)
        reserva.alojamiento.agregarReserva(reserva)
        this.servicioNotificacion.notificarAceptacionDeReserva(reserva)
    }
    
    cancelarReserva(reserva, motivo) {
        const cambioEstadoReserva = new CambioEstadoReserva(TipoEstadoReserva.CANCELADA, reserva, motivo, reserva.huespedReservador)
        reserva.actualizarEstado(cambioEstadoReserva)
        this.servicioNotificacion.notificarCancelacionDeReserva(motivo, reserva.alojamiento.anfitrion)
    }

    rechazarReserva(reserva, motivo) {
        const cambioEstadoReserva = new CambioEstadoReserva(TipoEstadoReserva.CANCELADA, reserva, motivo, reserva.alojamiento.anfitrion)
        reserva.actualizarEstado(cambioEstadoReserva)
        this.servicioNotificacion.notificarCancelacionDeReserva(motivo, reserva.huespedReservador)
    }
}