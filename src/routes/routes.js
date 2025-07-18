import express from "express";
import { healthRoutes } from "./healthRoutes.js";
import { swaggerRoutes } from "./swaggerRoutes.js";

const routes = [healthRoutes(), swaggerRoutes()];

export default routes;
