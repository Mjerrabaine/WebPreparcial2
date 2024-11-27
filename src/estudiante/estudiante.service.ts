import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Injectable()
export class EstudianteService {
   constructor(
       @InjectRepository(ProyectoEntity)
       private readonly proyectoRepository: Repository<ProyectoEntity>,

       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>,
   ){}

   async findOne(id: number): Promise<EstudianteEntity> {
       const estudiante = await this.estudianteRepository.findOne({where: {id}, relations: ['proyecto'] } );
       if (!estudiante)
         throw new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND);  

       return estudiante;
   }
  
   async create(estudiante: EstudianteEntity ): Promise<EstudianteEntity> {

        if (estudiante.codigoEstudiante.length!==10)
            throw new BusinessLogicException("The student code must be exactly 10 characters long.", BusinessError.BAD_REQUEST ); 
        
        const newEstudiante = this.estudianteRepository.create(estudiante);
        return await this.estudianteRepository.save(newEstudiante);
    }
}