import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';

import { SessionMiddleware } from '../middlewares/session.middleware';

@Module({
  controllers: [NotasController],
  providers: [NotasService],
})
export class NotasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('notas');
  }
}
