import { AlojamientoController } from "../../controllers/alojamientoController";
import { UsuarioRepository } from "../../models/repositories/usuarioRepository";
import { AlojamientoService } from "../../services/alojamientoService";
import { buildTestServer } from "./utils/server";
import { expect, jest } from "@jest/globals";
import request from "supertest";
import { ObjectId } from "mongodb";

const server = new buildTestServer();

server.configureRoutes();

const alojamientoRepository = {
  findAll: jest.fn().mockResolvedValue([
    {
      _id: new ObjectId("682e953f4c3b8b20080f9c6c"),
      __v: 0,
      cantHuespedesMax: 4,
      caracteristicas: ["WIFI", "PISCINA"],
      descripcion: "Cabaña acogedora en el bosque",
      direccion: {
        calle: "Ruta 40",
        altura: 300,
        ciudad: new ObjectId("682e797319dc84fac4c59f39"),
        lat: -41.1335,
        long: -71.3103,
      },
      horarioCheckIn: "14:00",
      horarioCheckOut: "10:00",
      idAnfitrion: new ObjectId("682e0702f86e7e1b7ab15889"),
      moneda: "PESO_ARG",
      nombre: "Cabaña del bosque",
      precioPorNoche: 1500,
      reservas: [],
    },
    {
      _id: new ObjectId("682e953f4c3b8b20080f9c7b"),
      __v: 0,
      cantHuespedesMax: 1,
      caracteristicas: ["WIFI"],
      descripcion: "Flores alrededor",
      direccion: {
        calle: "Ruta 10",
        altura: 100,
        ciudad: new ObjectId("682e797319dc84fac4c59f38"),
        lat: -77.11,
        long: -98.13,
      },
      horarioCheckIn: "06:00",
      horarioCheckOut: "18:00",
      idAnfitrion: new ObjectId("682e0702f86e7e1b7ab15889"),
      moneda: "REALES",
      nombre: "Florecia",
      precioPorNoche: 300,
      reservas: [],
    },
  ]),
};

const usuarioRepository = {
  findAll: jest.fn().mockResolvedValue([
    {
      _id: new ObjectId("682d6475cf589a7d0756d518"),
      __v: 0,
      email: "juli@gmail.com",
      nombre: "julian",
      notificaciones: [],
      tipo: "ANFITRION",
    },
    {
      _id: new ObjectId("682d64dacf589a7d0756d51f"),
      __v: 0,
      email: "juan@gmail.com",
      nombre: "juan",
      notificaciones: [],
      tipo: "HUESPED",
    },
    {
      _id: new ObjectId("682e0702f86e7e1b7ab15889"),
      __v: 0,
      email: "franco@gmail.com",
      nombre: "Franco",
      notificaciones: [],
      tipo: "ANFITRION",
    },
  ]),
};

const alojamientoService = new AlojamientoService(
  alojamientoRepository,
  usuarioRepository
);
const alojamientoController = new AlojamientoController(alojamientoService);

server.setController(AlojamientoController, alojamientoController);

describe("GET /alojamientos", () => {
  test("Debe retornar un estado 200 y 2 elementos", async () => {
    const response = await request(server.app).get("/alojamientos");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
  test("Filtro por rango de precios", async () => {
    const response = await request(server.app).get(
      "/alojamientos?precioGt=150&precioLt=1500"
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
  test("Filtro por cantidad de huespedes", async () => {
    const response = await request(server.app).get(
      "/alojamientos?personLimit=3"
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
