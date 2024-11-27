import { Column, Entity, PrimaryGeneratedColumn ,OneToOne, JoinColumn} from 'typeorm';
import { ProyectoEntity } from "../../proyecto/proyecto.entity/proyecto.entity";

@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column({ type: 'varchar', length: 100 })
 nombre: string;
 
 @Column({ type: 'varchar', length: 100 })
 codigoEstudiante: string;

 @Column({ type: 'int'})
 numCreditosAprovados: string;

 @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
 @JoinColumn()
 proyecto: ProyectoEntity;
}