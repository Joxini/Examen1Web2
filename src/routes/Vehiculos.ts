import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";

const routes = Router();

routes.get("", VehiculoController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/placa/:placa", VehiculoController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", VehiculoController.add);
routes.patch("", VehiculoController.update);
routes.delete("/placa/:placa", VehiculoController.delete);

export default routes;