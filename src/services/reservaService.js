import { ReservaModel } from "../models/schemas/reservaSchema.js";

export class ReservaService {
  constructor(
    reservaRepository,
    alojamientoRepository,
    usuarioRepository,
    notificacionService
  ) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.usuarioRepository = usuarioRepository;
    this.notificacionService = notificacionService;
  }

  async findAll(page, limit) {
    const result = await this.reservaRepository.findAll(page, limit);
    return {
      data: result.data,
      pagination: result.pagination,
    };
  }

  async findById(reservaId) {
    try {
      const reserva = await this.reservaRepository.findById(reservaId);
      console.log(reserva);
      return reserva;
    } catch (error) {
      throw new Error("No se encontro el objeto por su id");
    }
  }

  async crearReserva(reservaData) {
    if (
      !reservaData.huespedReservador ||
      !reservaData.alojamiento ||
      !reservaData.rangoDeFechas ||
      !reservaData.cantHuespedes
    ) {
      throw new Error("Faltan campos requeridos");
    }

    const alojamientoCompleto = await this.alojamientoRepository.findById(
      reservaData.alojamiento
    );

    if (!alojamientoCompleto) {
      throw new Error("Alojamiento no encontrado");
    }

    await this.verificarDisponibilidad(reservaData.alojamiento, {
      fechaInicio: new Date(reservaData.rangoDeFechas.fechaInicio),
      fechaFin: new Date(reservaData.rangoDeFechas.fechaFin),
    });

    const reserva = new ReservaModel({
      huespedReservador: reservaData.huespedReservador,
      cantHuespedes: reservaData.cantHuespedes,
      alojamiento: alojamientoCompleto.toObject(),
      rangoDeFechas: {
        fechaInicio: new Date(reservaData.rangoDeFechas.fechaInicio),
        fechaFin: new Date(reservaData.rangoDeFechas.fechaFin),
      },
      estado: "PENDIENTE",
    });

    const mensaje = `Se genero una reserva para ${alojamientoCompleto.nombre}`;

    const nuevaReserva = await this.reservaRepository.save(reserva);
    await this.notificacionService.crearNotificacion(
      mensaje,
      alojamientoCompleto.idAnfitrion
    );

    const mensaje2 = `Solicitaste una reserva para ${alojamientoCompleto.nombre}, estado: PENDIENTE`;
    await this.notificacionService.crearNotificacion(
      mensaje2,
      reservaData.huespedReservador
    );

    return nuevaReserva;
  }

  async verificarDisponibilidad(alojamientoId, nuevoRango) {
    const reservasDelAlojamiento =
      await this.reservaRepository.buscarReservasPorAlojamiento(alojamientoId);

    const haySolapamiento = reservasDelAlojamiento.some((reserva) =>
      this.#rangosSeSolapan(reserva.rangoDeFechas, nuevoRango)
    );

    if (haySolapamiento) {
      throw new Error(
        "El alojamiento no está disponible en las fechas solicitadas"
      );
    }

    return true;
  }

  #rangosSeSolapan(rangoReserva, nuevoRango) {
    return (
      nuevoRango.fechaInicio < rangoReserva.fechaFin &&
      nuevoRango.fechaFin > rangoReserva.fechaInicio
    );
  }

  async cambiarEstadoReserva(reservaId, nuevoEstado) {
    const reservaExistente = await this.reservaRepository.findById(reservaId);

    if (!reservaExistente) {
      throw new Error("Reserva no encontrada");
    }

    if (nuevoEstado === "CANCELADA") {
      if (reservaExistente.estado === "CANCELADA") {
        throw new Error("La reserva ya está cancelada");
      }
    }

    reservaExistente.estado = nuevoEstado;
    await this.reservaRepository.save(reservaExistente);

    const alojamientoExistente = await this.alojamientoRepository.findById(
      reservaExistente.alojamiento
    );

    const reservaActualizada = await this.reservaRepository.save(
      reservaExistente
    );
    const alojamiento = reservaExistente.alojamiento.nombre;
    const inicio = reservaExistente.rangoDeFechas.fechaInicio;
    const final = reservaExistente.rangoDeFechas.fechaFin;
    const mensajeAnfitrion = `La solicitud para ${alojamiento} en los dias ${inicio} - ${final}, fue ${nuevoEstado}`;
    const mensajeHuesped = `Tu solicitud de reserva para ${alojamiento} en los dias ${inicio} - ${final}, fue ${nuevoEstado}`;

    await this.notificacionService.crearNotificacion(
      mensajeHuesped,
      reservaExistente.huespedReservador
    );
    await this.notificacionService.crearNotificacion(
      mensajeAnfitrion,
      alojamientoExistente.idAnfitrion
    );
    return reservaActualizada;
  }

  async obtenerReservasDeUsuario(usuarioId, page, limit) {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    if (!usuario) {
      throw new Error("No existe el usuario");
    }
    console.log(usuario)
    const result = await this.reservaRepository.obtenerReservasDeUsuario(
      usuarioId,
      page,
      limit
    );

  if (!result.data || result.data.length === 0) {
    return {
      data: [],
      pagination: result.pagination
    };
  }

    return result
  }

  async obtenerReservasPorAnfitrion(anfitrionId, page, limit) {
    if (!anfitrionId) {
      throw new Error("El ID del anfitrión es requerido");
    }

    const result = await this.reservaRepository.buscarReservasPorAnfitrion(
      anfitrionId,
      page,
      limit
    );

    if (!result.data.length === 0) {
      return {
        data: [],
        pagination: result.pagination
      };
    }

    return {
      data: result.data,
      pagination: result.pagination
    }
  }

  async cambiarFechaReserva(reservaId, nuevoRango) {
    const reservaExistente = await this.reservaRepository.findById(reservaId);

    if (!reservaExistente) {
      throw new Error("Reserva no encontrada");
    }

    if (reservaExistente.rangoDeFechas.fechaInicio <= new Date()) {
      throw new Error(
        "No se puede cambiar la fecha de una reserva en curso o finalizada"
      );
    }

    await this.verificarDisponibilidad(
      reservaExistente.alojamiento._id,
      nuevoRango
    );

    reservaExistente.rangoDeFechas = nuevoRango;
    return await this.reservaRepository.save(reservaExistente);
  }
}
