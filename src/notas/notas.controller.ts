import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common';

import { Nota } from '../interface/nota.interface';
import { NotaDTO } from '../dto/nota.dto';
import { NotasService } from './notas.service';

import { ConsultarNotaDTO } from '../dto/consultar-nota.dto';
import { Request } from 'express';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasServicios: NotasService) { }

  @Post('crear')
  crear(@Body() notaDTO: NotaDTO, @Req() req: Request) {
    return this.notasServicios.crear(notaDTO, req.sessionID);
  }

  @Get('usuario')
  usuario(@Req() req: Request): Promise<Nota[]> {
    return this.notasServicios
      .buscarPorUsuario(req.sessionID)
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
