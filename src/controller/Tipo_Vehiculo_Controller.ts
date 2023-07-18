import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";

class TipoVehiculoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      //Crea el repositorio de la entidad TipoVehiculo
      const TipoVehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      let TipoVehiculoActivo;
      try {
        //Realiza la busqueda de todos los tipos y solo los activos
        TipoVehiculoActivo = await TipoVehiculoRepo.find({
          where: { estado: true },
        });
      } catch (error) {
        //En caso de que no encuentre nada
        return resp.status(404).json({ mensaje: "No se encontro datos." });
      }
      //devuelve los tipos vehiculos que encontro que esten activos
      return resp.status(200).json(TipoVehiculoActivo);
    } catch (error) {
      return resp.status(404).json({ mensaje: "Error al cargar los datos" });
    }
  };
  static getById = async (req: Request, resp: Response) => {
    try {
      //Extraemos el id como paracmetro
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      //Realizamos la instancia del repositorio de TipoVehiculo
      const TipoVehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      let TipoActivo;

      try {
        //Buscamos el TipoVehiculo por el ID y que este activo
        TipoActivo = await TipoVehiculoRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el Tipo Vehiculo con ese ID" });
      }
      //Devolvemos la marca que encontro
      return resp.status(200).json(TipoActivo);
    } catch (error) {
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //Extraemos los datos del body
      const { id, nombre } = req.body;

      // Creamos la instancia del repositorio de TipoVehiculo
      const TipoVehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);

      //Validamos si ya existe un TipoVehiculo con ese ID
      const SearchTipoVehiculo = await TipoVehiculoRepo.findOne({
        where: { id },
      });

      if (SearchTipoVehiculo) {
        return resp
          .status(404)
          .json({ mensaje: "La marca ya existe en la base de datos" });
      }

      //Creamos el nuevo TipoVehiculo
      let TipoVehiculo = new Tipo_Vehiculo();
      TipoVehiculo.id = id;
      TipoVehiculo.nombre = nombre;

      //Guardamos
      try {
        await TipoVehiculoRepo.save(TipoVehiculo);
        return resp
          .status(200)
          .json({ mensaje: "Tipo Vehiculo Creado correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "Error al guardar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error en el proceso" });
    }
  };

  static update = async (req: Request, resp: Response) => {};
  static delete = async (req: Request, resp: Response) => {
    try {
      //Extraemos el Id, que el usuario desea eliminar
      let id;
      id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(400).json({ mensaje: "Debe indicar el numero" });
      }

      // Creamos la instancia del repositorio de TipoVehiculo
      const TipoVehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);

      //Validamos si el TipoVehiculo existe en la base de datos
      const TipoVehiculoDelete = await TipoVehiculoRepo.findOne({
        where: { id, estado: true },
      });

      if (!TipoVehiculoDelete) {
        return resp
          .status(404)
          .json({ mensaje: "El Tipo Vehiculo no existe en la base de datos" });
      }
      try {
        //Hacemos el borrado logico
        TipoVehiculoDelete.estado = false;
        //Guardamos el cambio
        await TipoVehiculoRepo.save(TipoVehiculoDelete);
        return resp.status(200).json({ mensaje: "Se elimino correctamente" });
      } catch (error) {
        return resp
          .status(400)
          .json({ mensaje: "Ocurrio un problema al momento de eliminar" });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: "No se pudo eliminar" });
    }
  };
}
//Exportamos la clase
export default TipoVehiculoController;
