import { Router } from "express";
import MarcaController from "../controller/MarcaController";

const routes = Router();

routes.get("", MarcaController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/Id/:id", MarcaController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", MarcaController.add);
routes.patch("/Id/:id", MarcaController.update);
routes.delete("/Id/:id", MarcaController.delete);

export default routes;