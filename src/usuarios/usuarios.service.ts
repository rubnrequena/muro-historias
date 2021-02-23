import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from 'src/dto/usuario.dto';
import * as md5 from 'md5';

import { Usuario } from '../interface/usuario.interface';
import { generarToken } from '../utils/jwt';

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [];

  crear(usuarioDTO: UsuarioDTO): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      const usuarioExiste = this.usuarios.find(
        (usuario) => usuario.usuario == usuarioDTO.usuario,
      );
      if (usuarioExiste) {
        reject({ error: 406, mensaje: 'usuario ya existe' });
      }

      const claveSegura: string = md5(usuarioDTO.clave);
      const usuarioId: string = md5(
        Date.now() + usuarioDTO.usuario + claveSegura,
      );
      const usuario: Usuario = {
        id: usuarioId,
        usuario: usuarioDTO.usuario,
        clave: claveSegura,
        token: generarToken({
          id: usuarioId,
          usuario: usuarioDTO.usuario,
          fechaSesion: new Date().toISOString(),
        }),
      };
      this.usuarios.push(usuario);
      resolve(usuario);
    });
  }

  login(usuarioDTO: UsuarioDTO): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      const clave: string = md5(usuarioDTO.clave);
      const usuario = this.usuarios.find((usuario) => {
        return usuario.usuario == usuarioDTO.usuario && usuario.clave == clave;
      });
      if (!usuario) return reject({ error: 401, mensaje: 'Usuario no existe' });
      usuario.token = generarToken({
        id: usuario.id,
        usuario: usuarioDTO.usuario,
        fechaSesion: new Date().toISOString(),
      });
      resolve(usuario);
    });
  }
}
