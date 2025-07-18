import { RangoFechas } from "../../models/entities/rangoFechas.js";
import { Reserva } from "../../models/entities/reserva.js";
import { Alojamiento } from "../../models/entities/alojamiento.js";
import { CambioEstadoReserva } from "../../models/entities/cambioEstadoReserva.js";
import { Usuario } from "../../models/entities/usuario.js";
import { ServicioReserva } from "../../models/entities/servicioReserva.js";
import { ServicioNotificacion } from "../../models/entities/servicioNotificacion.js";
import { FactoryNotification } from "../../models/entities/factoryNotification.js";
import {
  TipoCaracteristica,
  TipoUsuario,
  TipoMoneda,
} from "../../utils/enums.js";

const usuario1 = new Usuario(
  "Luciano",
  "lvalenzuelamaltas@frba.utn.edu.ar",
  TipoUsuario.HUESPED
);
const usuario3 = new Usuario(
  "Messi",
  "lionelmessi@hotmail.com",
  TipoUsuario.ANFITRION
);
const usuario2 = new Usuario(
  "Trump",
  "donaldjtrump@gmail.com",
  TipoUsuario.ANFITRION
);

const aloja1 = new Alojamiento(
  usuario2,
  "pepe",
  "calor",
  1200,
  "DOLAR_USA",
  "08:00",
  "20:00",
  "",
  4,
  ["WIFI", "PISCINA"],
  ""
);

const dia1 = new Date("2026-3-25");

const dia2 = new Date("2026-3-26");

const dia0 = new Date("2026-3-24");

const dia3 = new Date("2026-3-27");

const dia95 = new Date("2026-3-31");

const rg1 = new RangoFechas(dia1, dia2); //25->26

const rg2 = new RangoFechas(dia0, dia3); //24->27

const rg3 = new RangoFechas(new Date("2026-3-23"), dia1); //23->25

const rg4 = new RangoFechas(dia1, dia3); //25->27

const rg95 = new RangoFechas(dia3, dia95); //27->31

const fabric = new FactoryNotification();
const servicio1 = new ServicioNotificacion(fabric);
const servicio2 = new ServicioReserva(servicio1);

const reserva3 = new Reserva(usuario1, 1, aloja1, rg3, "p");
const reserva1 = new Reserva(usuario1, 1, aloja1, rg2, "p");
const reserva4 = new Reserva(usuario1, 1, aloja1, rg4, "p");

const reserva5 = new Reserva(usuario1, 1, aloja1, rg95, "p");

describe("Alojamientos", () => {
  test("tiene caracteristicas", () => {
    expect(aloja1.tenesCaracteristica("WIFI")).toBe(true);
  });

  test("Esta dentro del rango de precio", () => {
    expect(aloja1.tuPrecioEstaDentroDe(500, 1800)).toBe(true);
  });

  test("Pueden alojarse n personas", () => {
    expect(aloja1.puedenAlojarse(5)).toBe(false);
  });

  test("Esta disponible en rango de fechas", () => {
    expect(aloja1.estasDisponibleEn(rg1)).toBe(true);
  });

  test("No se puede agregar reserva", () => {
    aloja1.agregarReserva(reserva3);
    aloja1.agregarReserva(reserva4);
    expect(() => {
      aloja1.agregarReserva(reserva1);
    }).toThrow("No puede agregarse esta reserva");
  });
  test("Se agrego reserva exitosamente", () => {
    aloja1.agregarReserva(reserva5);
    expect(aloja1.reservas.length).toBe(3);
  });
});
