import { Column, Entity, PrimaryGeneratedColumn , ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { ProfesorEntity } from "../../profesor/profesor.entity/profesor.entity";
import { ProyectoEntity } from "../../proyecto/proyecto.entity/proyecto.entity";

@Entity()
export class PropuestaEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column({ type: 'varchar', length: 100 })
 titulo: string;
 
 @Column({ type: 'varchar', length: 100 })
 descripcion: string;

 @Column({ type: 'varchar', length: 100 })
 palabraClave: string;

 @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
 profesor: ProfesorEntity;

 @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
 @JoinColumn()
 proyecto: ProyectoEntity;
}