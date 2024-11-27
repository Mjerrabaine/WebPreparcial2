import { Column, Entity, PrimaryGeneratedColumn , OneToMany} from 'typeorm';
import { PropuestaEntity } from "../../propuesta/propuesta.entity/propuesta.entity";

@Entity()
export class ProfesorEntity {
 @PrimaryGeneratedColumn('increment')//UUID is only for strings 
 id: number;

 @Column({ type: 'int' })
 cedula: number;
 
 @Column({ type: 'varchar', length: 100 })
 nombre: string;

 @Column({ type: 'varchar', length: 100 })
 grupoInvesigacion: string;
 
 @Column({ type: 'int'})
 numeroExtension: number;

 @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
 propuestas: PropuestaEntity[];
}