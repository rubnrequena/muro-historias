import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class MarcarFavoritoDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly notaId: string;

  @IsNotEmpty()
  @IsBoolean()
  favorita: boolean;
}
