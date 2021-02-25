import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common';

import { Nota } from '../interface/nota.interface';
import { CrearNotaDTO } from '../dto/nota.dto';
import { NotasService } from './notas.service';

import { ConsultarNotaDTO } from '../dto/consultar-nota.dto';
import { Request } from 'express';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'Authentication',
  description: 'JTW Bearer Token',
  required: true,
})
@ApiBearerAuth()
@Controller('notas')
export class NotasController {
  constructor(private readonly notasServicios: NotasService) { }

  @Post('crear')
  crear(@Body() notaDTO: CrearNotaDTO, @Req() req: Request) {
    const usuarioId = new Types.ObjectId(req.sessionID);
    return this.notasServicios.crear(notaDTO, usuarioId);
  }

  @Get('usuario')
  usuario(@Req() req: Request): Promise<Nota[]> {
    const usuarioId = new Types.ObjectId(req.sessionID);
    return this.notasServicios
      .buscarPorUsuario(usuarioId)
      .catch((error) => error);
  }

  @Get()
  todas() {
    return this.notasServicios.todas();
  }

  @Get('nota')
  nota(@Query() consultarNotaDTO: ConsultarNotaDTO): Promise<Nota> {
    return this.notasServicios
      .buscar(consultarNotaDTO.notaId)
      .catch((error) => error);
  }
}
