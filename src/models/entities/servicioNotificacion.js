export class ServicioNotificacion {
    constructor(factoryNotification){
        this.factoryNotification = factoryNotification
    } // TODO mover a las operaciones
    
    notificarNuevaReserva(unaReserva){
        const notificacion = this.factoryNotification.crearSegunReserva(unaReserva)
        unaReserva.alojamiento.anfitrion.agregarNotificacion(notificacion)
    }

    notificarAceptacionDeReserva(unaReserva){
        const notificacion = this.factoryNotification.crearComoRespuesta("La Reserva ha sido aceptada", unaReserva.huespedReservador)
        unaReserva.huespedReservador.agregarNotificacion(notificacion)
    }

    notificarCancelacionDeReserva(motivo, notificado){
        const notificacion = this.factoryNotification.crearComoRespuesta(motivo, notificado)
        notificado.agregarNotificacion(notificacion)
    }
}
