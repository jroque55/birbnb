export class Notificacion {
    constructor(mensaje, usuario) {
        this.mensaje = mensaje,
        this.usuario = usuario,
        this.fechaAlta = new Date(),
        this.leida = false
    }

}
