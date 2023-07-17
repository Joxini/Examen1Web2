import { Router } from "express";
import TipoVehiculoController from "../controller/Tipo_Vehiculo_Controller";

const routes = Router();

routes.get("", TipoVehiculoController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", TipoVehiculoController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", TipoVehiculoController.add);
routes.patch("", TipoVehiculoController.update);
routes.delete("", TipoVehiculoController.delete);

export default routes;