import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { SessionMiddleware } from '../middlewares/session.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorito, FavoritoEsquema } from '../esquemas/favorito.esquema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Favorito.name, schema: FavoritoEsquema }])],
  providers: [FavoritosService],
  controllers: [FavoritosController]
})
export class FavoritosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('favoritos');
  }
}
