import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class MarcarFavoritoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly notaId: string;

  @ApiProperty({ enum: [true, false] })
  @IsBoolean()
  favorita: boolean;
}
