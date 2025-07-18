import {Notificacion} from "./notificacion.js"
export class FactoryNotification {
    
    crearSegunReserva(reserva) {
        const mensaje = "El usuario " + reserva.huespedReservador.nombre + 
        " ha solicitado el alojamiento " + reserva.alojamiento.nombre +
        "\n para el día " + reserva.rangoFechas.fechaInicio + " por un total de " +
        reserva.rangoFechas.duracion() + " día/s."

        const nueva_noti = new Notification(mensaje, reserva.alojamiento.anfitrion, Date())
        return nueva_noti
    }

    crearComoRespuesta(mensaje, notificado){
        const nueva_noti = new Notification(mensaje, notificado, Date())
        return nueva_noti
    }

}
