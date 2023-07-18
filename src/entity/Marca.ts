import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Marca {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "Debe indicar el id" })
  id: number;

  @Column({ nullable: true })
  @IsNotEmpty({ message: "Debe indicar el nombre" })
  nombre: string;

  @Column({ nullable: true })
  @IsNotEmpty({ message: "Debe indicar si es metalizado" })
  metalizado: boolean;

  @Column({ default: true, nullable: true })
  estado: boolean;

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.marcas, { cascade: true })
  Vehiculos: Vehiculo[];
}
