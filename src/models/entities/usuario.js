export class Usuario {
    constructor(nombre, email, password, tipo) {
        this.nombre = nombre,
        this.email = email,
        this.tipo = tipo,
        this.password = password
        this.notificaciones = []
        this.reservas = []
    }

    agregarNotificacion(unaNotificacion) {
        this.notificaciones.push(unaNotificacion);
    }

    leerNotificaciones(){
        //recorre lista de notificaciones, las va eliminando y a su vez le avisa a la notificacion para que se marque como leida.
    }
}
