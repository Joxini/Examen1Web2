import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Color } from "../entity/Color";

class ColorController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      //Crea el repositorio de la entidad Color
      const repoColor = AppDataSource.getRepository(Color);
      let ColorActivo;
      try {
        //Realiza la busqueda de todos los colores y solo los activos
        ColorActivo = await repoColor.find({ where: { estado: true } });
      } catch (error) {
        //En caso de que no encuentre nada
        return resp.status(404).json({ mensaje: "No se encontro datos." });
      }
      //devuelve los Colores que encontro que esten activos
      return resp.status(200).json(ColorActivo);
    } catch (error) {
      return resp.status(404).json({ mensaje: "Error al cargar los datos" });
    }
  };
  static getById = async (req: Request, resp: Response) => {
    try {
      //Extraemos el numero como paracmetro
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      //Creamos la instancia del repositorio de Color
      const ColorRepo = AppDataSource.getRepository(Color);
      let color;

      try {
        //Validamos si existe con el ID y si se encuentra activo
        color = await ColorRepo.findOneOrFail({ where: { id, estado: true } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el marca con ese ID" });
      }
      //Mostramos el dato que encontro
      return resp.status(200).json(color);
    } catch (error) {
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //Extraemos los datos del cuerpo
      const { id, nombre } = req.body;

      //Creamos la instancia del repositorio
      const ColorRepo = AppDataSource.getRepository(Color);

      //Realizamos la busqueda del color por el ID
      const SearchColor = await ColorRepo.findOne({ where: { id } });

      //Validamos si ya existe un color con el mismo Id en la base de datos.
      if (SearchColor) {
        return resp
          .status(404)
          .json({ mensaje: "La marca ya existe en la base de datos" });
      }

      //Creamos el nuevo Color
      let AddColor = new Color();
      AddColor.id = id;
      AddColor.nombre = nombre;

      //Guardamos
      try {
        await ColorRepo.save(AddColor);
        return resp.status(200).json({ mensaje: "Color Creado correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "Error al guardar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error en el proceso" });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      const { nombre } = req.body;
      let id;

      id = parseInt(req.params["id"]);

      /* El código recupera el repositorio para la entidad `Color` de `AppDataSource` y lo asigna
            a la variable `MarcaRepo`. */
      const MarcaRepo = AppDataSource.getRepository(Color);

      //Realizamos la busqueda de el color que vamos a modificar
      const ColorUpdate = await MarcaRepo.findOne({
        where: { id, estado: true },
      });

      if (!ColorUpdate) {
        return resp
          .status(404)
          .json({ mensaje: "La marca no existe en la base de datos" });
      }

      //Realizamos los cambios
      ColorUpdate.nombre = nombre;
      // Guardamos los cambios
      try {
        await MarcaRepo.save(ColorUpdate);
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
      let id;
      //Extraemos el paracmetro que el usuario digite y lo ponemos de forma entera
      id = parseInt(req.params["id"]);
      //Por si el usuario no pone algun dato
      if (!id) {
        return resp.status(400).json({ mensaje: "Debe indicar el numero" });
      }

      //inicializamos el repositorio de color
      const ColorRepo = AppDataSource.getRepository(Color);

      //Buscamos el color por el ID que vamos a borrar
      const ColorDelete = await ColorRepo.findOne({
        where: { id, estado: true },
      });

      //Vericamos si el color existe en la base de datos
      if (!ColorDelete) {
        return resp
          .status(404)
          .json({ mensaje: "El color no existe en la base de datos" });
      }
      try {
        //Realizamos el borrado logico, poniendo el estado en false
        ColorDelete.estado = false;
        //Guardamos los cambios
        await ColorRepo.save(ColorDelete);
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
export default ColorController;
