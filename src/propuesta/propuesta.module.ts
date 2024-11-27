import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { PropuestaService } from './propuesta.service';
import { PropuestaController } from './propuesta.controller';

@Module({
  providers: [PropuestaService],
  controllers: [PropuestaController],

})
export class PropuestaModule {}
