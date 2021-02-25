import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsuarioDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly clave: string;
}
