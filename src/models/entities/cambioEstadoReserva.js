import { TipoEstadoReserva } from "../../utils/enums.js"

export class CambioEstadoReserva {                         //Buscar utilidad de esta clase
    constructor(estado, reserva, motivo, usuario) {
        this.fecha = Date(),
        this.estado = estado,
        this.reserva = reserva,
        this.motivo = motivo,
        this.usuario = usuario
    }
}
