import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';

@Injectable()
export class ProfesorService {
   constructor(
       @InjectRepository(ProfesorEntity)
       private readonly profesorRepository: Repository<ProfesorEntity>
   ){}

   async findOne(id: number): Promise<ProfesorEntity> {
       const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: "propuesta" } );
       if (!profesor)
         throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
  
       return profesor;
   }
  
   async create(): Promise<ProfesorEntity> {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { grupoInves } });
    
    if (!profesor)
        throw new BusinessLogicException("The profesor with the given cedula was not found", BusinessError.NOT_FOUND);

    const validGroups = ["TICSW", "IMAGINE", "COMIT"];
    if (!validGroups.includes(profesor.grupoInves)) {
        throw new BusinessLogicException(
            `The grupo de investigación must be one of the following values: ${validGroups.join(", ")}`,
            BusinessError.PRECONDITION_FAILED
        );
    }

    await this.profesorRepository.save(profesor);
    return profesor; // Optional: Return the saved entity if required
}

   async update(id: number, profesor: ProfesorEntity): Promise<ProfesorEntity> {
       const persistedProfesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
       if (!persistedProfesor)
         throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
      
       profesor.id = id; 
      
       return await this.profesorRepository.save(profesor);
   }

   async delete(numCed: number) {
       const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{numCed}});
       if (!profesor)
         throw new BusinessLogicException("The profesor with the given cedula was not found", BusinessError.NOT_FOUND);
    
       await this.profesorRepository.remove(profesor);
   }
}