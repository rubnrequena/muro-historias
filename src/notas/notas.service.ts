import { Injectable } from '@nestjs/common';
import { MarcarFavoritoDTO } from '../dto/marcar-favorito.dto';
import { NotaDTO } from '../dto/nota.dto';

import { Model, Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Schema } from "mongoose";
import { Nota as NotaDoc, NotaDocumento } from '../esquemas/nota.esquema';

@Injectable()
export class NotasService {
  constructor(@InjectModel(NotaDoc.name) private notaModel: Model<NotaDocumento>) { }

  crear(notaDTO: NotaDTO, usuarioID: string): Promise<NotaDocumento> {
    return new Promise((resolve, reject) => {
      const tiempo: Date = new Date();
      return new this.notaModel({
        favorita: notaDTO.favorita || false,
        fecha: tiempo,
        nota: notaDTO.nota,
        usuario: usuarioID,
      }).save().then(nota => {
        if (notaDTO.favorita == true) {
          this.marcarFavorita({ notaId: nota.id, favorita: true }, usuarioID);
        }
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

  buscarPorUsuario(usuarioId: string): Promise<NotaDocumento[]> {
    return new Promise((resolve, reject) => {
      const usuarioObjectId = new Schema.Types.ObjectId(usuarioId)
      const notas: Query<NotaDocumento[], NotaDocumento> = this.notaModel.find({ usuario: usuarioObjectId })
      if (!notas)
        return reject({
          error: 404,
          mensaje:
            'No hay notas registradas, por favor registre una y vuelva a intentar',
        });
      resolve(notas);
    });
  }

  buscarFavoritas(usuarioId: string): Promise<NotaDocumento[]> {
    return new Promise((resolve) => {
      /* this.favoritoModel.find({ usuarioId }).then(favoritos => {

      }) */
    });
  }

  marcarFavorita(nota: MarcarFavoritoDTO, usuarioId: string): Promise<NotaDocumento> {
    return new Promise((resolve, reject) => {
      /* this.buscar(nota.notaId)
        .then(async (notaEncontrada) => {
          const favoritoExiste = await this.favoritoModel.findOne({ usuarioId, notaId: notaEncontrada._id });
          if (favoritoExiste) return reject({ error: 406, mensaje: 'la nota ya esta en tus favoritos' })
          const favorito = new this.favoritoModel({ usuarioId, notaId: notaEncontrada._id });
          await favorito.save();
          resolve(notaEncontrada);
        })
        .catch((error) => error); */
    });
  }
}
