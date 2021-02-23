import { Usuario } from './usuario.interface';

export interface Sesion {
  readonly cookie: Cookie;
  usuario: Usuario;
}

export interface Cookie {
  readonly path: string;
  readonly _expires: number;
  readonly originalMaxAge: number;
  readonly httpOnly: boolean;
}
