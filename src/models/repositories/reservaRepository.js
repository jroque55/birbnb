import { ReservaModel } from "../schemas/reservaSchema.js";
import { TipoEstadoReserva } from "../../utils/enums.js";

export class ReservaRepository {
  constructor() {
    this.model = ReservaModel;
  }

  async findById(id) {
    try {
      const res = await this.model.findById(id);
      return res;
    } catch (error) {
      throw new Error("No se encontro el objeto");
    }
  }

  async findAll(page, limit) {
    const skip = (page - 1) * limit

    const totalDocuments = await this.model.countDocuments()
    const reservas = await this.model.find().limit(limit).skip(skip).populate("alojamiento");
    console.log(reservas)
    const totalPages = Math.ceil(totalDocuments / limit);
    const NextPage = page < totalPages;
    const PrevPage = page > 1;

    return {
      data: notificaciones,
      pagination: {
        currentPage: page,
        totalPages,
        totalDocuments,
        NextPage,
        PrevPage,
        limit,
        skip
      }
    }
  }

  async save(reserva) {
    const query = reserva.id
      ? { _id: reserva.id }
      : { _id: new this.model()._id };
    return await this.model
      .findOneAndUpdate(query, reserva, {
        new: true,
        runValidators: true,
        upsert: true,
      })
      .populate("alojamiento");
  }

  async buscarReservasPorAlojamiento(alojamientoId) {
    return await ReservaModel.find({
      alojamientoId,
      estado: { $ne: TipoEstadoReserva.CANCELADA },
    }).select("rangoDeFechas");
  }

async obtenerReservasDeUsuario(usuarioId, page, limit) {
  const skip = (page - 1) * limit;
  
  const totalDocuments = await this.model.countDocuments({
    huespedReservador: usuarioId
  });
  
  const reservasUsuario = await this.model.find({
    huespedReservador: usuarioId
  })
  .limit(limit)
  .skip(skip)
  .populate("alojamiento")
  .lean();

  console.log(reservasUsuario)
  const totalPages = Math.ceil(totalDocuments / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    data: reservasUsuario,
    pagination: {
      currentPage: page,
      totalPages,
      totalDocuments,
      hasNextPage,
      hasPrevPage,
      limit,
      skip
    }
  };
}

  async buscarAlojamientosOcupados(fechaInicio, fechaFin) {
    const reservas = await this.model.find({
      $or: [
        {
          "rangoDeFechas.fechaInicio": { $lt: fechaFin },
          "rangoDeFechas.fechaFin": { $gt: fechaInicio },
        },
      ],
      estado: { $ne: "cancelada" },
    });

    return reservas.map((r) => r.alojamiento);
  }

  async buscarReservasPorAnfitrion(anfitrionId, page, limit) {
    const skip = (page - 1) * limit
    const totalDocuments = await this.model.countDocuments({
        "alojamiento.idAnfitrion": anfitrionId,
        estado: { $in: ["PENDIENTE", "CONFIRMADA", "RECHAZADA"] },
      })

    const totalPages = Math.ceil(totalDocuments / limit);
    const NextPage = page < totalPages;
    const PrevPage = page > 1;

    const reservas = await ReservaModel.find({
        "alojamiento.idAnfitrion": anfitrionId,
        estado: { $in: ["PENDIENTE", "CONFIRMADA", "RECHAZADA"] },
      })
        .populate("huespedReservador", "nombre email")
        .lean();

        console.log(reservas)
      return {
        data: reservas,
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
}
