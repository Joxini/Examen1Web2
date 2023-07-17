import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";

class MarcaController {

    static getAll = async (req: Request, resp: Response) => {

        try {
            const repoMac = AppDataSource.getRepository(Marca);
            let MarcasActivas;
            try {
                MarcasActivas = await repoMac.find({ where: { estado: true } })
            } catch (error) {
                return resp.status(404).json({ mensaje: "No se encontro datos." })
            }
            return resp.status(200).json(MarcasActivas);
        } catch (error) {
            return resp.status(404).json({ mensaje: "Error al cargar los datos" })
        }
    }
    static getById = async (req: Request, resp: Response) => {

        try {
            //Extraemos el id, en fomrato Int
            const id = parseInt(req.params["id"]);
            if (!id) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            //Hacemos la instancia del repositorio
            const MarcasRepo = AppDataSource.getRepository(Marca);
            let Marcas;

            try {
                //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                // Encuentre
                Marcas = await MarcasRepo.findOneOrFail({ where: { id, estado: true } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el marca con ese ID' })
            }

            //En caso de que si alla algo, lo mande
            return resp.status(200).json(Marcas)
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }


    }

    static add = async (req: Request, resp: Response) => {

        //Agregamos el trycath
        try {
            // De esa manera estamos sacando del body esos datos:
            const { id, nombre, metalizado } = req.body;
            // Validaciones de reglas de negocio
            const MarcaRepo = AppDataSource.getRepository(Marca);
            //Buscamoms el producto en la base de datos, para ver si existe
            const SearchMarca = await MarcaRepo.findOne({ where: { id } })
            // Validamos si el producto esta en la base de datos
            if (SearchMarca) {
                return resp.status(404).json({ mensaje: 'La marca ya existe en la base de datos' })
            }

            //Creamos el nuevo producto
            let AddMarca = new Marca();
            AddMarca.id = id;
            AddMarca.nombre = nombre;
            AddMarca.metalizado = metalizado;

            //Guardamos
            try {
                await MarcaRepo.save(AddMarca);
                return resp.status(200).json({ mensaje: 'Marca Creada correctamente' });
            } catch (error) {
                return resp.status(400).json({ mensaje: 'Error al guardar' })
            }
        } catch (error) {
            return resp.status(400).json({ mensaje: "Error en el proceso" })
        }

    }

    static update = async (req: Request, resp: Response) => {

        try {
            const { nombre, metalizado } = req.body;
            let id;
            //Extraemos el id, en fomrato Int
            id = parseInt(req.params["id"]);
            // Hacemos la instancia del repositorio
            const MarcaRepo = AppDataSource.getRepository(Marca);

            // Buscamos la factura por su número
            const MarcaUpdate = await MarcaRepo.findOne({ where: { id, estado: true } });

            // Validamos si la factura existe en la base de datos
            if (!MarcaUpdate) {
                return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' });
            }

            // Actualizamos los campos de la factura
            MarcaUpdate.nombre = nombre;
            MarcaUpdate.metalizado = metalizado;
            // Guardamos los cambios
            try {
                await MarcaRepo.save(MarcaUpdate);
                return resp.status(200).json({ mensaje: 'Marca modificada correctamente' });
            } catch (error) {
                return resp.status(400).json({ mensaje: 'Error al modificar' })
            }

        } catch (error) {
            return resp.status(400).json({ mensaje: error });
        }
    }
    static delete = async (req: Request, resp: Response) => {

        try {
            let id;
            id = parseInt(req.params["id"]);
            if (!id) {
                return resp.status(400).json({ mensaje: 'Debe indicar el numero' })
            }

            const MarcaRepo = AppDataSource.getRepository(Marca);
            // Buscamos la factura por su número
            const MarcaDelete = await MarcaRepo.findOne({ where: { id, estado: true } });

            // Validamos si la factura existe en la base de datos
            if (!MarcaDelete) {
                return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' });
            }
            try {
                MarcaDelete.estado = false;
                await MarcaRepo.save(MarcaDelete);
                return resp.status(200).json({ mensaje: 'Se elimino correctamente' })
            } catch (error) {
                return resp.status(400).json({ mensaje: 'Ocurrio un problema al momento de eliminar' })
            }
        } catch (error) {
            return resp.status(404).json({ mensaje: 'No se pudo eliminar' })
        }


    }
}

export default MarcaController;