import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';

@Injectable()
export class ProyectoService {
   constructor(
       @InjectRepository(ProyectoEntity)
       private readonly proyectoRepository: Repository<ProyectoEntity>,
   ){}
  
   async create(proyecto: ProyectoEntity ): Promise<ProyectoEntity> {

        if (proyecto.fechaFin<proyecto.fechaInicio) {
            throw new BusinessLogicException("The Start date is not before the end date", BusinessError.BAD_REQUEST );

        }

        const newProyecto = this.proyectoRepository.create(proyecto);
        return await this.proyectoRepository.save(newProyecto);
    }
}