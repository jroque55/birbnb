import request from "supertest";
import { buildTestServer } from "./utils/server.js";
import { AlojamientoRepository } from "../models/repositories/alojamientoRepository.js";
import { AlojamientoController } from "../controllers/alojamientoController.js";
import { ReservaModel } from "../models/schemas/reservaSchema.js";

const server = buildTestServer();

const alojamientoRepository = new AlojamientoRepository();
const alojamientoController = new AlojamientoController(alojamientoRepository);

server.setController(AlojamientoController, alojamientoController);

test("should return a 200 status and 3 alojamientos", async () => {
  const response = await request(server.app).get("/alojamientos");

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(3); //Colocar en el toBe la cantidad de alojamientos en MongoDB
});

test("should return a 200 status and 1 alojamiento with", async () => {
  const response = await request(server.app).get(
    "/alojamientos?personLimit=100"
  );

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1); //Colocar en el toBe la cantidad de alojamientos en MongoDB
  //expect(response.body).toContain({: 1000})
  //const valor = response.body
  //expect(valor).toContain(100)//.toBeGreaterThanOrEqual(100)
  //expect(response.body.data).toContain(100)
});
