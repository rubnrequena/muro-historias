import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocumento = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ unique: true })
  usuario: string;

  @Prop()
  clave: string;

  @Prop()
  token: string;
}

export const UsuarioEsquema = SchemaFactory.createForClass(Usuario);