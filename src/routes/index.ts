import { Router } from "express";
import Vehiculo from "./Vehiculos";
import Tipo_Vehiculo from "./Tipo_Vehiculos";
import Marca from "./Marcas";
import Color from "./Colores";


const routes = Router();

routes.use('/Vehiculo',Vehiculo);
routes.use('/TipoVehiculo', Tipo_Vehiculo);
routes.use('/Marca',Marca);
routes.use('/Color',Color);




export default routes;