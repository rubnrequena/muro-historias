import { Types } from 'mongoose';

export interface Nota {
  readonly _id: Types.ObjectId;
  readonly usuario: string;
  readonly nota: string;
  readonly fecha: Date;
  readonly publico: boolean;
}
