import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { getRepository } from "typeorm";
import { Color } from "../entity/Color";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";
import { Marca } from "../entity/Marca";

class VehiculoController {

    static getAll = async (req: Request, resp: Response) => {
       

    }
    static getById = async (req: Request, resp: Response) => {
        
        try {
            //Extraemos el id, en fomrato Int
            const placa = req.params["placa"];
            if (!placa) {
                return resp.status(404).json({ mensaje: 'No se indica la placa' })
            }
            //Hacemos la instancia del repositorio
            const VehiculosRepo = AppDataSource.getRepository(Vehiculo);
            let Vehiculos;

            try {
                //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                // Encuentre
                Vehiculos = await VehiculosRepo.findOneOrFail({ where: { placa}, relations: { marcas: true, TiposVehiculos:true ,colores:true} })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el vehiculo con esa placa' })
            }

            //En caso de que si alla algo, lo mande
            return resp.status(200).json(Vehiculos)
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }

    }

    static add = async (req: Request, resp: Response) => {

         //Agregamos el trycath
         try {
            // De esa manera estamos sacando del body esos datos:
            const { id, placa, id_marca,id_color,cilindraje,id_TipoVehiculo,cantidadPasajeros} = req.body;
            
            const VehiculoRepository = AppDataSource.getRepository(Vehiculo);
            const ColorRepository = AppDataSource.getRepository(Color);
            const MarcaRepository = AppDataSource.getRepository(Marca);
            const TipoVehiculoRepository = AppDataSource.getRepository(Tipo_Vehiculo);

            const SearchVehiculo= await VehiculoRepository.findOne({ where: { id } })
            if (SearchVehiculo) {
                return resp.status(404).json({ mensaje: 'El vehiculo con ese ID ya existe en la base de datos' })
            }

            const SearchColor= await ColorRepository.findOne({ where: { id:id_color } })
            if (!SearchColor) {
                return resp.status(404).json({ mensaje: 'El color no existe en la base de datos' })
            }

            const SearchMarca= await MarcaRepository.findOne({ where: { id:id_marca } })
            if (!SearchMarca) {
                return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' })
            }

            const SearchTipoVehiculo= await TipoVehiculoRepository.findOne({ where: { id:id_TipoVehiculo } })
            if (!SearchMarca) {
                return resp.status(404).json({ mensaje: 'El vehiculo no existe en la base de datos' })
            }




            //Creamos el nuevo producto
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

            //Guardamos
            try {
                await VehiculoRepository.save(AddVehiculo);
                return resp.status(200).json({ mensaje: 'Marca Creada correctamente' });
            } catch (error) {
                return resp.status(400).json({ mensaje: 'Error al guardar' })
            }
        } catch (error) {
            return resp.status(400).json({ mensaje: "Error en el proceso" })
        }
    }

    static update = async (req: Request, resp: Response) => {

    }
    static delete = async (req: Request, resp: Response) => {

    }
}

export default VehiculoController;