import { Column, Entity, PrimaryGeneratedColumn ,OneToOne,JoinColumn} from 'typeorm';
import { PropuestaEntity } from "../propuesta/propuesta.entity/propuesta.entity";

@Entity()
export class ProyectoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 fechaInicio: Date;

 @Column()
 fechaFin: Date;

 @Column()
 url: string;

 @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
 @JoinColumn()
 propuesta: PropuestaEntity;
}