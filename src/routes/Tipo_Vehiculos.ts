import { Router } from "express";
import TipoVehiculoController from "../controller/Tipo_Vehiculo_Controller";

const routes = Router();


//Rutas hacia los controladores respectivos.
routes.get("", TipoVehiculoController.getAll);
routes.get("/:id", TipoVehiculoController.getById);
routes.post("", TipoVehiculoController.add);
routes.patch("", TipoVehiculoController.update);
routes.delete("/:id", TipoVehiculoController.delete);

export default routes;