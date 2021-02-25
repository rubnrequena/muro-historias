import { IsBoolean, IsNotEmpty } from 'class-validator';

export class NotaDTO {
  @IsNotEmpty()
  readonly nota: string;

  readonly publico: boolean;
}
