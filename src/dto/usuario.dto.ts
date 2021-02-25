import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsuarioDTO {
  @ApiProperty({ default: "usuario" })
  @IsNotEmpty()
  readonly usuario: string;

  @ApiProperty({ default: "1234" })
  @IsNotEmpty()
  readonly clave: string;
}
