import { Column, Entity, PrimaryGeneratedColumn ,OneToOne, JoinColumn} from 'typeorm';
import { ProyectoEntity } from "../proyecto/proyecto.entity/proyecto.entity";

@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 nombre: string;
 
 @Column()
 numCreditosAprovados: string;

 @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
 @JoinColumn()
 proyecto: ProyectoEntity;
}