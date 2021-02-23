import { IsNotEmpty } from 'class-validator';

export class UsuarioDTO {
  @IsNotEmpty()
  readonly usuario: string;

  @IsNotEmpty()
  readonly clave: string;
}
