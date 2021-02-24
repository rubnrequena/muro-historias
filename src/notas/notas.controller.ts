import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common';

import { Nota } from '../interface/nota.interface';
import { NotaDTO } from '../dto/nota.dto';
import { NotasService } from './notas.service';

import { ConsultarNotaDTO } from '../dto/consultar-nota.dto';
import { Request } from 'express';
import { Types } from 'mongoose';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasServicios: NotasService) {}

  @Post('crear')
  crear(@Body() notaDTO: NotaDTO, @Req() req: Request) {
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
