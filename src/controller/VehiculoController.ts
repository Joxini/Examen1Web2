import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { getRepository } from "typeorm";
import { Color } from "../entity/Color";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";
import { Marca } from "../entity/Marca";

class VehiculoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      //Crea el repositorio de la entidad Vehiculo
      const repoVehiculor = AppDataSource.getRepository(Vehiculo);
      let VehiculoActivo;
      try {
        //Realiza la busqueda de todos los vehiculos y solo los activos
        VehiculoActivo = await repoVehiculor.find({
          where: { estado: true },
          relations: { marcas: true, TiposVehiculos: true, colores: true },
        });
      } catch (error) {
        //En caso de que no encuentre nada
        return resp.status(404).json({ mensaje: "No se encontro datos." });
      }
      //devuelve los vehiculos que esten activos
      return resp.status(200).json(VehiculoActivo);
    } catch (error) {
      return resp.status(404).json({ mensaje: "Error al cargar los datos" });
    }
  };
  static getById = async (req: Request, resp: Response) => {
    try {
      //Extraemos la placa
      const placa = req.params["placa"];
      if (!placa) {
        return resp.status(404).json({ mensaje: "No se indica la placa" });
      }
      //Hacemos la instancia del repositorio
      const VehiculosRepo = AppDataSource.getRepository(Vehiculo);
      let Vehiculos;

      try {
        //Buscamos el vehiculo por medio de la placa y cargamos las relaciones que tiene
        Vehiculos = await VehiculosRepo.findOneOrFail({
          where: { placa, estado: true },
          relations: { marcas: true, TiposVehiculos: true, colores: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el vehiculo con esa placa" });
      }

      //En caso de que lo encuentre, lo develva
      return resp.status(200).json(Vehiculos);
    } catch (error) {
      //En posible error, lo que hacemos es devolver el error
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      // Sacamos los datos de el cuerpo body
      const {
        id,
        placa,
        id_marca,
        id_color,
        cilindraje,
        id_TipoVehiculo,
        cantidadPasajeros,
      } = req.body;

      //Creamos la instancias de los respectivos repositorios
      const VehiculoRepository = AppDataSource.getRepository(Vehiculo);
      const ColorRepository = AppDataSource.getRepository(Color);
      const MarcaRepository = AppDataSource.getRepository(Marca);
      const TipoVehiculoRepository = AppDataSource.getRepository(Tipo_Vehiculo);
      let SearchVehiculoPlaca;
      //Validamos de que ya este un vehiculo con el mismo ID
      const SearchVehiculo = await VehiculoRepository.findOne({
        where: { id },
      });
      if (SearchVehiculo) {
        return resp.status(404).json({
          mensaje: "El vehiculo con ese ID ya existe en la base de datos",
        });
      }

      //Validamos de que ya este un vehiculo con la misma placa
      SearchVehiculoPlaca = await VehiculoRepository.findOne({
        where: { placa },
      });
      if (SearchVehiculoPlaca) {
        return resp.status(404).json({
          mensaje: "El vehiculo con esa placa ya existe en la base de datos",
        });
      }

      //Validamos de que las llaves foraneas existan en la base de datos
      const SearchColor = await ColorRepository.findOne({
        where: { id: id_color, estado: true },
      });
      if (!SearchColor) {
        return resp
          .status(404)
          .json({ mensaje: "El color no existe en la base de datos" });
      }

      const SearchMarca = await MarcaRepository.findOne({
        where: { id: id_marca, estado: true },
      });
      if (!SearchMarca) {
        return resp
          .status(404)
          .json({ mensaje: "La marca no existe en la base de datos" });
      }

      const SearchTipoVehiculo = await TipoVehiculoRepository.findOne({
        where: { id: id_TipoVehiculo, estado: true },
      });
      if (!SearchTipoVehiculo) {
        return resp
          .status(404)
          .json({ mensaje: "El tipo vehiculo no existe en la base de datos" });
      }

      //Agregamos el nuevo vehiculo
      let AddVehiculo = new Vehiculo();
      let fecha = new Date();
      AddVehiculo.id = id;
      AddVehiculo.placa = placa;
      AddVehiculo.id_marca = id_marca;
      AddVehiculo.id_color = id_color;
      AddVehiculo.cilindraje = cilindraje;
      AddVehiculo.id_TipoVehiculo = id_TipoVehiculo;
      AddVehiculo.cantidadPasajeros = cantidadPasajeros;
      AddVehiculo.fecha_ingreso = fecha;

      //Guardamos el vehiculo
      try {
        await VehiculoRepository.save(AddVehiculo);
        return resp
          .status(200)
          .json({ mensaje: "Vehiculo Creado correctamente" });
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
      let placa;
      placa = req.params["placa"];
      if (!placa) {
        return resp.status(400).json({ mensaje: "Debe indicar el numero" });
      }

      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      // Buscamos el vehiculo por su número
      const VehiculoDelete = await VehiculoRepo.findOne({
        where: { placa, estado: true },
      });

      // Validamos si el vehiculo existe en la base de datos
      if (!VehiculoDelete) {
        return resp
          .status(404)
          .json({ mensaje: "El vehiculo no existe en la base de datos" });
      }
      try {
        //Realizamos el borrado logico
        VehiculoDelete.estado = false;
        //Guardamos los cambios
        await VehiculoRepo.save(VehiculoDelete);
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
export default VehiculoController;
