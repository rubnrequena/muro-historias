import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { MarcarFavoritoDTO } from 'src/dto/marcar-favorito.dto';
import { FavoritoDocumento } from 'src/esquemas/favorito.esquema';
import { Nota } from 'src/interface/nota.interface';
import { FavoritosService } from './favoritos.service';
import { ObjectId, Schema, Types } from "mongoose";

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritoServicio: FavoritosService) { }

  @Post('marcar')
  favorito(
    @Body() notaFavorita: MarcarFavoritoDTO,
    @Req() req: Request,
  ): Promise<any> {
    const usuarioId: Types.ObjectId = new Types.ObjectId(req.sessionID);
    const notaId: Types.ObjectId = new Types.ObjectId(notaFavorita.notaId);
    if (notaFavorita.favorita == true) {
      return this.favoritoServicio.nuevo(notaId, usuarioId).catch(onError)
    } else {
      return this.favoritoServicio.eliminar(notaId, usuarioId).catch(onError)
    }

    function onError(error) {
      return error
    }
  }

  @Get()
  favoritos(@Req() req: Request) {
    const usuarioId: Types.ObjectId = new Types.ObjectId(req.sessionID);
    return this.favoritoServicio.buscar(usuarioId)
  }
}
