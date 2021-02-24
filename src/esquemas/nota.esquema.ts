import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotaDocumento = Nota & Document;

@Schema()
export class Nota {
  @Prop({ required: true })
  usuario: Types.ObjectId;

  @Prop({ required: true })
  nota: string;

  @Prop({ default: false })
  favorita: boolean;

  @Prop({ default: new Date() })
  fecha: Date;
}

export const NotaEsquema = SchemaFactory.createForClass(Nota);