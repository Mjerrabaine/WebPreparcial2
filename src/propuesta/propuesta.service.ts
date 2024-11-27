import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';

@Injectable()
export class PropuestaService {
   constructor(
       @InjectRepository(ProyectoEntity)
       private readonly proyectoRepository: Repository<ProyectoEntity>,

       @InjectRepository(PropuestaEntity)
       private readonly propuestaRepository: Repository<PropuestaEntity>,
   ){}

   async findOne(id: number): Promise<PropuestaEntity> {
       const propuesta = await this.propuestaRepository.findOne({where: {id}, relations: ['profesor','proyecto'] } );
       if (!propuesta)
         throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
  
       return propuesta;
   }
  
   async create(propuesta: PropuestaEntity ): Promise<PropuestaEntity> {
        const validGroups = ["TICSW", "IMAGINE", "COMIT"];
        if (propuesta.titulo.trim().length === 0) {
            throw new BusinessLogicException("The propuesta title must not be empty.", BusinessError.NOT_FOUND);

        }

        const newPropuesta = this.propuestaRepository.create(propuesta);
        return await this.propuestaRepository.save(newPropuesta);
    }

    async findAll(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["profesor", "proyecto"] });
    }

    async delete(id: number) {
        const propuesta = await this.propuestaRepository.findOne(({where: {id}, relations: ['profesor','proyecto'] } ));
 
        if (!propuesta) {
         throw new BusinessLogicException(
           'The propuesta with the given id was not found',
           BusinessError.NOT_FOUND,
         );
       }
/*
       if (propuesta.proyecto) {
        throw new BusinessLogicException(
          "The propuesta with the given id cannot be deleted because it has an associated project",
          BusinessError.PRECONDITION_FAILED,
        );
      }
 */
        const hasAssociatedProjects = await this.hasProyecto(propuesta.id);
 
        if (hasAssociatedProjects)
          throw new BusinessLogicException("The propuesta has a proyecto and could not be deleted", BusinessError.NOT_FOUND);
     
        await this.propuestaRepository.remove(propuesta);
    }

    private async hasProyecto(propuestaId: number): Promise<boolean> {
        const propuesta = await this.propuestaRepository.findOne({
          where: { id: propuestaId },
          relations: ['proyecto'],
        });
      
        return propuesta?.proyecto !== null && propuesta?.proyecto !== undefined;
      }
}