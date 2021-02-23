import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verificar } from '../utils/jwt';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.url == "/") return next();

    const headers: any = req.headers;
    let auth: string = headers['authorization'];
    if (!auth) return res.status(401).json({ error: 401, mensaje: 'No tiene autorizacion, o no ha iniciado sesion' });
    auth = auth.replace('Bearer ', '')
    let usuario = verificar(auth);
    if (usuario) {
      req.sessionID = usuario.id;
      next();
    }
    else res.status(401).json({ error: 401, mensaje: 'No tiene autorizacion, o no ha iniciado sesion' });
  }
}
