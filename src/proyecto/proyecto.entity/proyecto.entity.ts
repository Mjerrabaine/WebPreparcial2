import { Column, Entity, PrimaryGeneratedColumn ,OneToOne,JoinColumn} from 'typeorm';
import { PropuestaEntity } from "../../propuesta/propuesta.entity/propuesta.entity";
import { EstudianteEntity } from "../../estudiante/estudiante.entity/estudiante.entity";


@Entity()
export class ProyectoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 fechaInicio: Date;

 @Column()
 fechaFin: Date;

 @Column({ type: 'varchar', length: 100 })
 url: string;

 @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
 @JoinColumn()
 propuesta: PropuestaEntity;

 @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
 @JoinColumn()
 estudiante: EstudianteEntity;
}