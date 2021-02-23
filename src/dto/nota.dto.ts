import { IsBoolean, IsNotEmpty } from 'class-validator';

export class NotaDTO {
  @IsNotEmpty()
  readonly nota: string;

  @IsBoolean()
  readonly favorita: boolean;
}
