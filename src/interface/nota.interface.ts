import { Types } from "mongoose";

export interface Nota {
  readonly _id: Types.ObjectId;
  readonly usuario: string;
  readonly nota: string;
  favorita: boolean;
  readonly fecha: Date;
}
