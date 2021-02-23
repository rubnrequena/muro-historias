import { Injectable } from '@nestjs/common';
import { NotaFavoritaDTO } from 'src/dto/nota-favorita.dto';
import { NotaDTO } from 'src/dto/nota.dto';
import { Nota } from '../interface/nota.interface';

import * as md5 from 'md5';

@Injectable()
export class NotasService {
  private notas: Nota[] = [];
  private favoritos = new Map()

  crear(notaDTO: NotaDTO, usuarioID: string): Nota {
    const tiempo: Date = new Date();
    const nota: Nota = {
      id: md5(tiempo.getTime() + notaDTO.nota),
      favorita: notaDTO.favorita || false,
      fecha: tiempo,
      nota: notaDTO.nota,
      usuario: usuarioID,
    };
    this.notas.push(nota);
    if (notaDTO.favorita == true) {
      this.marcarFavorita({ notaId: nota.id, favorita: true }, usuarioID)
    }
    return nota;
  }

  todas(): Promise<Nota[]> {
    return new Promise((resolve) => {
      resolve(this.notas.sort((a, b) => {
        if (a.fecha < b.fecha) return 1;
        else if (a.fecha > b.fecha) return -1;
        else return 0;
      }))
    });
  }

  buscar(notaId: string): Promise<Nota> {
    return new Promise((resolve, reject) => {
      const nota = this.notas.find((nota) => nota.id == notaId);
      if (!nota) reject({ error: 404, mensaje: `Nota '${notaId}' no existe` });
      else resolve(nota);
    });
  }

  buscarPorUsuario(usuarioId: string): Promise<Nota[]> {
    return new Promise((resolve, reject) => {
      const notas: Nota[] = this.notas.filter(
        (nota) => nota.usuario == usuarioId,
      );
      if (!notas)
        return reject({
          error: 404,
          mensaje:
            'No hay notas registradas, por favor registre una y vuelva a intentar',
        });
      resolve(notas);
    });
  }

  buscarFavoritas(usuarioId: string): Promise<Nota[]> {
    return new Promise((resolve, reject) => {
      const notasFavoritas: string[] = this.favoritos.get(usuarioId);
      resolve(notasFavoritas.map(notaId => {
        return this.notas.find(nota => nota.id == notaId)
      }))
    });
  }

  marcarFavorita(nota: NotaFavoritaDTO, usuarioId: string): Promise<Nota> {
    return this.buscar(nota.notaId)
      .then((notaEncontrada) => {
        notaEncontrada.favorita = true;
        let notasFavoritas: string[] = [];
        const tieneFavoritos = this.favoritos.has(usuarioId);
        if (tieneFavoritos) {
          notasFavoritas = this.favoritos.get(usuarioId);
        }
        notasFavoritas.push(notaEncontrada.id);
        this.favoritos.set(usuarioId, notasFavoritas);
        return notaEncontrada;
      })
      .catch((error) => error);
  }
}
