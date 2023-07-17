import "reflect-metadata"
import { DataSource } from "typeorm"
import { Vehiculo } from "./entity/Vehiculo"
import { Color } from "./entity/Color"
import { Marca } from "./entity/Marca"
import { Tipo_Vehiculo } from "./entity/Tipo_Vehiculo"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "bdExamen",
    synchronize: false,
    logging: false,
    entities: [Vehiculo,Color,Marca,Tipo_Vehiculo],
    migrations: [],
    subscribers: [],
})
