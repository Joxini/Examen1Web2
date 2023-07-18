import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";

class MarcaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      //Realizamos la instancia del repositorio de Marca
      const repoMac = AppDataSource.getRepository(Marca);
      let MarcasActivas;
      try {
        //Extraemos las marcas que esten en la base de datos
        //y solo las que estan activas.
        MarcasActivas = await repoMac.find({ where: { estado: true } });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro datos." });
      }
      //Mostramos las Marcas activas.
      return resp.status(200).json(MarcasActivas);
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
      //Realizamos la instancia del repositorio de marca
      const MarcasRepo = AppDataSource.getRepository(Marca);
      let marca;

      try {
        //Buscamos la marca por el ID y que este activo
        marca = await MarcasRepo.findOneOrFail({ where: { id, estado: true } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el marca con ese ID" });
      }
      //Devolvemos la marca que encontro
      return resp.status(200).json(marca);
    } catch (error) {
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //Extraemos los datos del body
      const { id, nombre, metalizado } = req.body;

      // Creamos la instancia del repositorio de Marca
      const MarcaRepo = AppDataSource.getRepository(Marca);

      //Validamos si ya existe una marca con ese ID en el ID
      const SearchMarca = await MarcaRepo.findOne({ where: { id } });

      if (SearchMarca) {
        return resp
          .status(404)
          .json({ mensaje: "La marca ya existe en la base de datos" });
      }

      //Creamos la nueva Marca
      let AddMarca = new Marca();
      AddMarca.id = id;
      AddMarca.nombre = nombre;
      AddMarca.metalizado = metalizado;

      //Guardamos
      try {
        await MarcaRepo.save(AddMarca);
        return resp.status(200).json({ mensaje: "Marca Creada correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "Error al guardar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error en el proceso" });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      //Extraemos los datos del body
      const { nombre, metalizado } = req.body;
      let id;
      //Extraemos el id de la marca que el usuario desea modificar
      id = parseInt(req.params["id"]);

      // Creamos la instancia del repositorio de Marca
      const MarcaRepo = AppDataSource.getRepository(Marca);
      // Validamos si la marca existe en la base de datos
      const MarcaUpdate = await MarcaRepo.findOne({
        where: { id, estado: true },
      });

      if (!MarcaUpdate) {
        return resp
          .status(404)
          .json({ mensaje: "La marca no existe en la base de datos" });
      }

      //Modificamos los campos
      MarcaUpdate.nombre = nombre;
      MarcaUpdate.metalizado = metalizado;
      // Guardamos los cambios
      try {
        await MarcaRepo.save(MarcaUpdate);
        return resp
          .status(200)
          .json({ mensaje: "Marca modificada correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "Error al modificar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
  static delete = async (req: Request, resp: Response) => {
    try {
      //Extraemos el Id, que el usuario desea eliminar
      let id;
      id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(400).json({ mensaje: "Debe indicar el numero" });
      }

      // Creamos la instancia del repositorio de Marca
      const MarcaRepo = AppDataSource.getRepository(Marca);

      //Validamos si la marca existe en la base de datos
      const MarcaDelete = await MarcaRepo.findOne({
        where: { id, estado: true },
      });

      if (!MarcaDelete) {
        return resp
          .status(404)
          .json({ mensaje: "La marca no existe en la base de datos" });
      }
      try {
        //Hacemos el borrado logico
        MarcaDelete.estado = false;
        //Guardamos el cambio
        await MarcaRepo.save(MarcaDelete);
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
export default MarcaController;
