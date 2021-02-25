import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConsultarNotaDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly notaId: string;
}
