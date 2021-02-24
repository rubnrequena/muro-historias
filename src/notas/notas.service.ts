import { Injectable } from '@nestjs/common';
import { MarcarFavoritoDTO } from '../dto/marcar-favorito.dto';
import { NotaDTO } from '../dto/nota.dto';

import { Model, Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from "mongoose";
import { Nota as NotaDoc, NotaDocumento } from '../esquemas/nota.esquema';

@Injectable()
export class NotasService {
  constructor(@InjectModel(NotaDoc.name) private notaModel: Model<NotaDocumento>) { }

  crear(notaDTO: NotaDTO, usuarioID: Types.ObjectId): Promise<NotaDocumento> {
    return new Promise((resolve, reject) => {
      const tiempo: Date = new Date();
      return new this.notaModel({
        favorita: notaDTO.favorita || false,
        fecha: tiempo,
        nota: notaDTO.nota,
        usuario: usuarioID,
      }).save().then(nota => {
        resolve(nota);
      }).catch(error =>
        reject({ erro: 406, mensaje: 'ocurrio un error al registrar nota' }))
    });
  }

  todas(): Promise<NotaDocumento[]> {
    return new Promise((resolve) => {
      resolve(
        this.notaModel.find().sort({ fecha: -1 })
      );
    });
  }

  buscar(notaId: string): Promise<NotaDocumento> {
    return new Promise(async (resolve, reject) => {
      const nota = await this.notaModel.findById(notaId);
      if (!nota) reject({ error: 404, mensaje: `Nota '${notaId}' no existe` });
      else resolve(nota);
    });
  }

  buscarPorUsuario(usuarioId: Types.ObjectId): Promise<NotaDocumento[]> {
    return new Promise((resolve, reject) => {
      const notas: Query<NotaDocumento[], NotaDocumento> = this.notaModel.find({ usuario: usuarioId })
      if (!notas)
        return reject({
          error: 404,
          mensaje:
            'No hay notas registradas, por favor registre una y vuelva a intentar',
        });
      resolve(notas);
    });
  }
}
