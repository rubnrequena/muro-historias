import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola, bienvenido al Muro de la Fama, dejanos aqui tus mejores ideas, nosotros las cuidaremos por ti. También podras compartir las ideas con el resto del mundo!';
  }
}
