export interface Nota {
  readonly id: string;
  readonly usuario: string;
  readonly nota: string;
  favorita: boolean;
  readonly fecha: Date;
}
