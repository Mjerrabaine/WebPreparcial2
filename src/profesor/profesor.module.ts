import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { ProfesorService } from './profesor.service';

@Module({
  //imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  providers: [ProfesorService],
  //exports: [TypeOrmModule],
})
export class ProfesorModule {}
