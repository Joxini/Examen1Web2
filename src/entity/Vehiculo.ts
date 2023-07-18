import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, PrimaryColumn } from "typeorm"
import { Marca } from "./Marca"
import { Tipo_Vehiculo } from "./Tipo_Vehiculo"
import { Color } from "./Color"
import { IsNotEmpty } from "class-validator"

@Entity()
export class Vehiculo {

    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'Debe indicar el Id'})
    id: number

    @Column({unique: true, nullable:true})
    @IsNotEmpty({ message: 'Debe indicar la placa'})
    placa: string

    @Column({nullable:true})
    @IsNotEmpty({ message: 'Debe indicar el Id marca'})
    id_marca: number //ManyToOne

    @Column({nullable:true})
    @IsNotEmpty({ message: 'Debe indicar el id color'})
    id_color: number //ManyToMany

    @Column({nullable:true})
    @IsNotEmpty({ message: 'Debe indicar el cilindraje'})
    cilindraje: number //ManyToMany

    @Column({nullable:true})
    @IsNotEmpty({ message: 'Debe indicar el id tipo vehiculo'})
    id_TipoVehiculo: number //ManyToMany

    @Column({nullable:true})
    @IsNotEmpty({ message: 'Debe indicar la cantidad de pasajeros'})
    cantidadPasajeros: number;

    @Column({type: 'date',nullable:true})
    fecha_ingreso: Date;

    @Column({default:true,nullable:true})
    estado: boolean;

    @ManyToOne(() => Marca, (marca) => marca.Vehiculos)
    @JoinColumn({ name: 'id_marca' })
    marcas: Marca;

    @ManyToOne(() => Tipo_Vehiculo, (tipo) => tipo.vehiculo)
    @JoinColumn({name: 'id_TipoVehiculo'})
    TiposVehiculos: Tipo_Vehiculo;

    @ManyToOne(() => Color, (color) => color.vehiculos)
    @JoinColumn({name: 'id_color'})
    colores: Color;
}
