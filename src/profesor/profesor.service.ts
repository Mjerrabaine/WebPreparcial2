import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { PropuestaEntity } from '../propuesta/propuesta.entity/propuesta.entity';

@Injectable()
export class ProfesorService {
   constructor(
       @InjectRepository(ProfesorEntity)
       private readonly profesorRepository: Repository<ProfesorEntity>,

       @InjectRepository(PropuestaEntity)
       private readonly propuestaRepository: Repository<PropuestaEntity>,
   ){}

   async findOne(id: number): Promise<ProfesorEntity> {
       const profesor = await this.profesorRepository.findOne({where: {id}, relations: ['propuesta'] } );
       if (!profesor)
         throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
  
       return profesor;
   }
  
   async create(profesor: ProfesorEntity ): Promise<ProfesorEntity> {
        const validGroups = ["TICSW", "IMAGINE", "COMIT"];
        if (!validGroups.includes(profesor.grupoInvesigacion)) {
            throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);

        }

        const newProfesor = this.profesorRepository.create(profesor);
        return await this.profesorRepository.save(newProfesor);
    }


    async delete(id: number) {
        const profesor = await this.findOne(id);

        const hasAssociatedProjects = await this.hasProposalsWithProjects(profesor.id);

        if (hasAssociatedProjects)
          throw new BusinessLogicException("The profesor with the given id  could not be deleted", BusinessError.NOT_FOUND);
     
        await this.profesorRepository.remove(profesor);
    }

   async deleteCedula(cedula: number) {
       const profesor = await this.profesorRepository.findOne({where:{cedula}});

       if (!profesor) {
        throw new BusinessLogicException(
          'The professor with the given cedula was not found',
          BusinessError.NOT_FOUND,
        );
      }

       const hasAssociatedProjects = await this.hasProposalsWithProjectsCedula(profesor.cedula);

       if (hasAssociatedProjects)
         throw new BusinessLogicException("The profesor with the given cedula could not be deleted", BusinessError.NOT_FOUND);
    
       await this.profesorRepository.remove(profesor);
   }

   private async hasProposalsWithProjects(profesorId: number): Promise<boolean> {
    const proposals = await this.propuestaRepository.find({
      where: { profesor: { id: profesorId } },
      relations: ['proyecto'], 
    });
  
    return proposals.some((propuesta) => propuesta.proyecto !== null);
  }

  private async hasProposalsWithProjectsCedula(profesorcedula: number): Promise<boolean> {
    const propuesta = await this.propuestaRepository.findOne({
      where: { id },
      relations: ["proyecto"],
    });
  
    return propuesta.length>0;
  }
}