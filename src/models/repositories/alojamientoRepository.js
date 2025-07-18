import { AlojamientoModel } from "../schemas/alojamientoSchema.js";
import { TipoCaracteristica } from "../../utils/enums.js";

export class AlojamientoRepository {
  constructor(reservaRepository) {
    this.model = AlojamientoModel;
    this.reservaRepository = reservaRepository;
  }

  async findAll(filters = {}, page, limit) {
    const query = {};
    
    if (filters.personLimit) {
      query.cantHuespedesMax = { $gte: Number(filters.personLimit) };
    }
    
    if (filters.caracteristica) {
      query.caracteristicas = { $all: filters.caracteristica.map(String) };
    }
    
    if (filters.ciudad) {
      query["direccion.ubicacion.ciudad"] = { $eq: String(filters.ciudad) };
    }
    
    if (filters.pais) {
      query["direccion.ubicacion.pais"] = { $eq: String(filters.pais) };
    }
    
    if (filters.lat) {
      query["direccion.latitud"] = { $eq: Number(filters.lat) };
    }
    
    if (filters.long) {
      query["direccion.longitud"] = { $eq: Number(filters.long) };
    }
    
    if (filters.precioGt || filters.precioLt) {
      query.precioPorNoche = {};
      if (filters.precioGt)
        query.precioPorNoche.$gte = Number(filters.precioGt);
      if (filters.precioLt)
        query.precioPorNoche.$lte = Number(filters.precioLt);
    }
    
    if (filters.fechaInicio && filters.fechaFin) {
      const fechaInicio = new Date(filters.fechaInicio);
      const fechaFin = new Date(filters.fechaFin);
      const alojamientosOcupados =
        await this.reservaRepository.buscarAlojamientosOcupados(
          fechaInicio,
          fechaFin
        );
      query._id = { $nin: alojamientosOcupados };
    }

    const skip = (page - 1) * limit;
    

    const totalDocuments = await this.model.countDocuments(query);
    

    const alojamientos = await this.model
      .find(query)
      .limit(limit)
      .skip(skip)
      .populate("idAnfitrion");

    const totalPages = Math.ceil(totalDocuments / limit);
    const NextPage = page < totalPages;
    const PrevPage = page > 1;

    return {
      data: alojamientos,
      pagination: {
        currentPage: page,
        totalPages,
        totalDocuments,
        NextPage,
        PrevPage,
        limit,
        skip
      }
    };
  }

  async save(alojamiento) {
    const query = alojamiento.id
      ? { _id: alojamiento.id }
      : { _id: new this.model()._id };
    return await this.model
      .findOneAndUpdate(query, alojamiento, {
        new: true,
        runValidators: true,
        upsert: true,
      })
      .populate("idAnfitrion");
  }

  async findByName(nombre) {
    return await this.model.findOne({ nombre }).populate("idAnfitrion");
  }

  async deleteById(id) {
    const resultado = await this.model.findByIdAndDelete(id);
    return resultado !== null;
  }

  async findById(id) {
    const res = await this.model.findById(id);
    return res
  }
  /*

    async findAll() {
        return this.model.find();
    }

    async findByUbication(ubicacion) {
        return await this.model.find(ubicacion);
    }
  
    async findByPriceRange(filters = {}) {
        const query = {};
        if (filters.precioGt) {
            query.precioBase = { $gte: Number(filters.precioGt) };
        }
        if (filters.precioLt) {
            query.precioBase = { $lte: Number(filters.precioLt) };
        }
        //return await this.model.find(query);
        return await this.model.find({ precioPorNoche: { $gte: 18 }, precioPorNoche: { $lte: 18 } });
    }

    async findByPersonLimit(cantHuespedesMax) {
        return await this.model.find({ cantHuespedesMax: { $gte: cantHuespedesMax } });
    }

    async findByCharacteristic(caracteristicas) {
        return await this.model.find({ caracteristicas });
    }*/
}
