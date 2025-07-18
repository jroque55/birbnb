import { ConflictError, NotFoundError, ValidationError } from "../errors/AppError.js";
import { TipoCaracteristica, TipoMoneda } from "../utils/enums.js";
import { Alojamiento } from "../models/entities/alojamiento.js";

export class AlojamientoService {
  constructor(alojamientoRepository, usuarioRepository) {
    this.alojamientoRepository = alojamientoRepository;
    this.UsuarioRepository = usuarioRepository
  }

  async findAll(filters = {}, page, limit) {
    if (filters.caracteristica) {
      const caracteristicas = Array.isArray(filters.caracteristica) 
        ? filters.caracteristica 
        : [filters.caracteristica];
      
      const invalidFeatures = caracteristicas.filter(
        c => !Object.values(TipoCaracteristica).includes(c.toUpperCase())
      );
      
      if (invalidFeatures.length > 0) {
        throw new ValidationError(`Características no válidas: ${invalidFeatures.join(', ')}`);
      }
    }

    const result = await this.alojamientoRepository.findAll(filters, page, limit);
    
    if (!result.data || result.data.length === 0) {
      throw new NotFoundError(`No se encontraron alojamientos en la página ${page}`);
    }

    return {
      data: result.data.map(alo => this.toDTO(alo)),
      pagination: result.pagination
    };
  }


  async create(alojamiento) {
    const { idAnfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos} = alojamiento

    const caractValidas = Object.values(TipoCaracteristica)
    if(!idAnfitrion || !nombre || !descripcion || typeof precioPorNoche !== "number" || ![TipoMoneda.DOLAR_USA, TipoMoneda.PESO_ARG, TipoMoneda.REALES].includes(moneda) || typeof cantHuespedesMax !== "number" || !caracteristicas.every(carac => caractValidas.includes(carac))){
      throw new ValidationError('Faltan campos requeridos o son invalidos')
    }
  
    const existente = await this.alojamientoRepository.findByName(nombre) 
    if(existente){
      throw new ConflictError(`Ya existe un alojamiento con el nombre ${nombre}`)
    }
    
    const anfitrion = await this.UsuarioRepository.findById(idAnfitrion)
    if(!anfitrion) {
      throw new NotFoundError(`Usuario con id ${idAnfitrion} no encontrado`)
    }

    const nuevo = new Alojamiento(idAnfitrion,nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos)

    const alojamientoGuardado = await this.alojamientoRepository.save(nuevo)
    return this.toDTO(alojamientoGuardado)
  }

  async delete(id) {
    const deleted = await this.alojamientoRepository.deleteById(id)
    if(!deleted) {
      throw new NotFoundError(`Alojamiento con id ${id} no encontrado`)
    }
    return deleted
  }

  async findById(id) {
    const alo = await this.alojamientoRepository.findById(id)
    if(!alo) {
      throw new NotFoundError(`Alojamiento con id ${id} no encontrado`)
    }
    return alo
  }

  toDTO(alojamiento) {
    return {
      id : alojamiento.id,
      anfitrion: alojamiento.idAnfitrion,
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      precioPorNoche: alojamiento.precioPorNoche,
      moneda: alojamiento.moneda,
      horarioCheckIn: alojamiento.horarioCheckIn,
      horarioCheckOut: alojamiento.horarioCheckOut,
      direccion: alojamiento.direccion,
      cantHuespedesMax: alojamiento.cantHuespedesMax,
      caracteristicas: alojamiento.caracteristicas,
      reservas: alojamiento.reservas,
      fotos: alojamiento.fotos
    }
  }

/*
  async findAll() {
    const alojamientos = await this.alojamientoRepository.findAll();
    return alojamientos;
  }

  async findByUbication(ubicacion) {
    const alojamiento = await this.alojamientoRepository.findByUbication(ubicacion);
    if (!alojamiento) {
      throw new NotFoundError(`No existen establecimientos radicados en ${ubicacion}`);
    }
    return alojamiento;
  }

  async findByPriceRange(rangoDePrecios) {
    const alojamiento = await this.alojamientoRepository.findByPriceRange(rangoDePrecios);
    if (!alojamiento) {
      throw new NotFoundError(`No existen alojamientos que oscilen entre los ${rangoDePrecios} pesos`);
    }
    return alojamiento;
  }

  async findByPersonLimit(cantHuespedesMax) {
    const alojamiento = await this.alojamientoRepository.findByPersonLimit(cantHuespedesMax);
    if (!alojamiento) {
      throw new NotFoundError(`No existen alojamientos que puedan albergar ${cantHuespedesMax} huespedes`);
    }
    return alojamiento;
  }

  async findByCharacteristic(caracteristicas) {
    const alojamiento = await this.alojamientoRepository.findByCharacteristic(caracteristicas);
    if (!alojamiento) {
      throw new NotFoundError(`No existen alojamientos que cuenten y/o permitan ${caracteristicas}`);
    }
    return alojamiento;
  }
*/
}