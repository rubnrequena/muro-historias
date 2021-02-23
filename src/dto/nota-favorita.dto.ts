import { IsBoolean, IsNotEmpty } from 'class-validator';

export class NotaFavoritaDTO {
  @IsNotEmpty()
  readonly notaId: string;

  @IsNotEmpty()
  @IsBoolean()
  favorita: boolean;
}
