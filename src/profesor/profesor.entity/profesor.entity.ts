import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}