export class RangoDeFechas {
    constructor(fechaInicio, fechaFin){
        this.fechaInicio = fechaInicio,
        this.fechaFin = fechaFin
    }

    duracion(){
        const msPorDia = 24 * 60 * 60 * 1000
        let diasDeDiferencia = (this.fechaFin.getTime() - this.fechaInicio.getTime()) / msPorDia
        return diasDeDiferencia + 1
    }

    getfechaInicio(){
        return this.fechaInicio
    }

    getfechaFin(){
        return this.fechaFin
    }

    
    estaEnRango(fechaInicio, fechaFin) {
        return this.fechaInicio < fechaFin && this.fechaFin > fechaInicio;
    }


}
