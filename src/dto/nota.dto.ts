import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CrearNotaDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly nota: string;

  @ApiProperty({ enum: ["true", "false"] })
  readonly publico: boolean;
}
