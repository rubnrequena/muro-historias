import { JwtService } from '@nestjs/jwt';

const PRIVATE_KEY = 'm1-cl4av3.s3cr3t4';
const service = new JwtService({ secret: PRIVATE_KEY });

export function generarToken(payload): string {
  const token = service.sign(payload);
  return token;
}

export function verificar(token: string) {
  try {
    return service.verify(token, { secret: PRIVATE_KEY });
  } catch (error) {
    return null;
  }
}
