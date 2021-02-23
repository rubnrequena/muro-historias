import { Controller, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsuarioDTO } from '../dto/usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosServicio: UsuariosService) {}

  @Post('registro')
  async crear(@Body() crearUsuarioDTO: UsuarioDTO, @Res() res: Response) {
    this.usuariosServicio
      .crear(crearUsuarioDTO)
      .then((usuario) => res.json(usuario))
      .catch((error) => {
        res.status(error.error).json(error);
      });
  }

  @Post('login')
  async login(@Body() usuarioDTO: UsuarioDTO, @Res() res: Response) {
    this.usuariosServicio
      .login(usuarioDTO)
      .then((usuario) => {
        res.json(usuario).end();
      })
      .catch((error) => {
        res.status(error.error).json(error);
      });
  }
}
