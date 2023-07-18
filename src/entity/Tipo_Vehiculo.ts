import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Tipo_Vehiculo {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Debe indicar el id" })
  id: number;

  @Column({ nullable: true })
  @IsNotEmpty({ message: "Debe indicar el nombre" })
  nombre: string;

  @Column({ default: true, nullable: true })
  estado: boolean;

  //Relacion con la entidad de Vehiculo.
  @OneToMany(() => Vehiculo, (Vehiculo) => Vehiculo.TiposVehiculos, {
    cascade: true,
  })
  vehiculo: Vehiculo[];
}
