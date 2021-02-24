import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FavoritoDocumento = Favorito & Document;

@Schema()
export class Favorito {
  @Prop({ type: Types.ObjectId })
  usuarioId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  notaId: Types.ObjectId;
}

export const FavoritoEsquema = SchemaFactory.createForClass(Favorito);
