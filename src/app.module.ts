import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotasModule } from './notas/notas.module';

@Module({
  imports: [UsuariosModule, NotasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
