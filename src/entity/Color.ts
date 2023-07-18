import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Debe indicar el id" })
  id: number;

  @Column({ nullable: true })
  @IsNotEmpty({ message: "Debe indicar el nombre" })
  nombre: string;

  @Column({ default: true, nullable: true })
  estado: boolean;

  //Relacion con la entidad de Vehiculo.
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.colores, { cascade: true })
  vehiculos: Vehiculo[];
}
