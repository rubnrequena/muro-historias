import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from 'src/dto/usuario.dto';
import * as md5 from 'md5';

import { Usuario } from '../interface/usuario.interface';
import { generarToken } from '../utils/jwt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario as UsuarioDoc, UsuarioDocumento, UsuarioEsquema } from '../esquemas/usuario.esquema';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(UsuarioDoc.name) private usuarioModel: Model<UsuarioDocumento>) { }

  crear(usuarioDTO: UsuarioDTO): Promise<UsuarioDocumento> {
    return new Promise((resolve, reject) => {
      const claveSegura: string = md5(usuarioDTO.clave);

      new this.usuarioModel({
        usuario: usuarioDTO.usuario,
        clave: claveSegura,
      }).save().then((usuarioCreado) => {
        usuarioCreado.token = generarToken({
          id: usuarioCreado._id,
          usuario: usuarioCreado.usuario,
          fechaSesion: new Date().toISOString(),
        })
        resolve(usuarioCreado)
      }).catch(() => {
        reject({ error: 406, mensaje: 'usuario ya existe' });
      })

    });
  }

  login(usuarioDTO: UsuarioDTO): Promise<UsuarioDocumento> {
    return new Promise((resolve, reject) => {
      const clave: string = md5(usuarioDTO.clave);
      const usuario = this.usuarioModel.findOne({ usuario: usuarioDTO.usuario, clave }).then(usuario => {
        if (!usuario) return reject({ error: 401, mensaje: 'Usuario no existe' });
        usuario.token = generarToken({
          id: usuario.usuario,
          usuario: usuario.usuario,
          fechaSesion: new Date().toISOString(),
        });
        resolve(usuario);
      })
    });
  }
}
