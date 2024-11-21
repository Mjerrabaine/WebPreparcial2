import { Column, Entity, PrimaryGeneratedColumn , ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { ProfesorEntity } from "../profesor/profesor.entity/profesor.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity/proyecto.entity";

@Entity()
export class PropuestaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 titulo: string;
 
 @Column()
 descripcion: string;

 @Column()
 palabraClave: string;

 @ManyToOne(() => ProfesorEntity, profesor => profesor.propuesta)
 profesor: ProfesorEntity;

 @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
 @JoinColumn()
 proyecto: ProyectoEntity;
}