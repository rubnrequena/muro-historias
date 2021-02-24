import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotasModule } from './notas/notas.module';

import { MongooseModule } from '@nestjs/mongoose';
import { FavoritosModule } from './favoritos/favoritos.module';

@Module({
  imports: [UsuariosModule, NotasModule, FavoritosModule, MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
