import { Router } from "express";
import ColorController from "../controller/ColorController";

const routes = Router();

//Rutas hacias los respectivos controladores.
routes.get("", ColorController.getAll);
routes.get("/:id", ColorController.getById);
routes.post("", ColorController.add);
routes.patch("", ColorController.update);
routes.delete("/:id", ColorController.delete);

//Exportamos la constante, para que las demas la puedan acceder.
export default routes;
