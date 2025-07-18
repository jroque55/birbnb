export class Alojamiento {
    
    constructor( idAnfitrion,nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, 
    horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos){
        this.idAnfitrion = idAnfitrion
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.precioPorNoche = precioPorNoche,
        this.moneda = moneda,
        this.horarioCheckIn = horarioCheckIn,
        this.horarioCheckOut = horarioCheckOut,
        this.direccion = direccion,
        this.cantHuespedesMax = cantHuespedesMax, 
        this.caracteristicas = caracteristicas,
        this.reservas = [],
        this.fotos = fotos
    }

    estasDisponibleEn(rangoDeFechas){
        return this.reservas.filter((reserva) => !reserva.estasCancelada())
        .every((reserva) => reserva.estoyDisponible(rangoDeFechas.fechaInicio, rangoDeFechas.fechaFin))
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) { 
        return this.precioPorNoche <= valorMaximo &&  this.precioPorNoche >= valorMinimo
    }

    tenesCaracteristica(caracteristica) {
        return this.caracteristicas.includes(caracteristica)
    }

    puedenAlojarse(cantHuespedes) {
        return cantHuespedes <= this.cantHuespedesMax
    }

    reservaCorrecta(unaReserva){
        return this.estasDisponibleEn(unaReserva.rangoFechas) && 
        this.puedenAlojarse(unaReserva.cantHuespedes) && this.nombre == unaReserva.alojamiento.nombre
    }

    agregarReserva(unaReserva){
        if(!this.reservaCorrecta(unaReserva)){
            throw new Error("No puede agregarse esta reserva")
        } else{
            this.reservas.push(unaReserva);
            console.log("\nReserva agregada con éxito")
        }

    }

}