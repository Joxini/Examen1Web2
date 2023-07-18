import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";

const routes = Router();

//Rutas hacias los respectivos controladores
routes.get("", VehiculoController.getAll);
routes.get("/:placa", VehiculoController.getById);
routes.post("", VehiculoController.add);
routes.patch("", VehiculoController.update);
routes.delete("/:placa", VehiculoController.delete);

//Compartir la constante
export default routes;