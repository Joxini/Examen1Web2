import { Router } from "express";
import ColorController from "../controller/ColorController";

const routes = Router();

routes.get("", ColorController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", ColorController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ColorController.add);
routes.patch("", ColorController.update);
routes.delete("", ColorController.delete);

export default routes;