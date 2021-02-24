import { ObjectId } from "mongoose";

export interface Favorito {
  readonly notaId: ObjectId;
  readonly usuarioId: ObjectId;
  readonly fecha: Date;
}
