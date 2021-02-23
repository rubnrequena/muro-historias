import { IsNotEmpty } from 'class-validator';

export class ConsultarNotaDTO {
  @IsNotEmpty()
  readonly notaId: string;
}
