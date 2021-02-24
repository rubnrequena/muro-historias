import { IsNotEmpty } from 'class-validator';

export class NotaDTO {
  @IsNotEmpty()
  readonly nota: string;
}
