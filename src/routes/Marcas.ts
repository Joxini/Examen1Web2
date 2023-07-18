import { Router } from "express";
import MarcaController from "../controller/MarcaController";

const routes = Router();

//Rutas hacia los contraladores respectivos.
routes.get("", MarcaController.getAll);
routes.get("/:id", MarcaController.getById);
routes.post("", MarcaController.add);
routes.patch("/:id", MarcaController.update);
routes.delete("/:id", MarcaController.delete);

//Exportamos la constante
export default routes;