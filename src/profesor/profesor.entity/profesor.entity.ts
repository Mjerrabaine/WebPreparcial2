import { Column, Entity, PrimaryGeneratedColumn , OneToMany} from 'typeorm';
import { PropuestaEntity } from "../propuesta/propuesta.entity/propuesta.entity";
@Entity()
export class ProfesorEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 numCed: number;
 
 @Column()
 grupoInves: string;
 
 @Column()
 numExtension: string;

 @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
 exhibitions: PropuestaEntity[];
}