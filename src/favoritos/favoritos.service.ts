import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Favorito as FavoritoDoc,
  FavoritoDocumento,
} from '../esquemas/favorito.esquema';
import { Nota } from '../interface/nota.interface';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectModel(FavoritoDoc.name)
    private favoritoModel: Model<FavoritoDocumento>,
  ) {}

  nuevo(notaId: Types.ObjectId, usuarioId: Types.ObjectId) {
    return new Promise(async (resolve, reject) => {
      const favoritoExiste = await this.favoritoModel.findOne({
        notaId,
        usuarioId,
      });
      if (favoritoExiste)
        return reject({
          error: 406,
          mensaje: `nota '${notaId}' ya esta en tu lista de favoritos`,
        });

      new this.favoritoModel({
        notaId: notaId,
        usuarioId: usuarioId,
      })
        .save()
        .then((favorito) => resolve(favorito))
        .catch(() =>
          reject({ error: 406, mensaje: 'Error al registrar favorito' }),
        );
    });
  }

  eliminar(notaId: Types.ObjectId, usuarioId: Types.ObjectId) {
    return this.favoritoModel.deleteOne({
      notaId: notaId,
      usuarioId: usuarioId,
    });
  }

  buscar(usuarioId: Types.ObjectId): Promise<Nota[]> {
    return new Promise((resolve, reject) => {
      this.favoritoModel.aggregate(
        [
          { $match: { usuarioId } },
          {
            $lookup: {
              from: 'notas',
              foreignField: '_id',
              localField: 'notaId',
              as: 'notas',
            },
          },
          { $unwind: '$notas' },
          { $replaceRoot: { newRoot: '$notas' } },
        ],
        (err, notas) => {
          if (err) reject(err);
          else resolve(notas);
        },
      );
    });
  }
}
