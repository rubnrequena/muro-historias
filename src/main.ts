import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as session from 'express-session';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(helmet());
  app.use(
    session({
      secret: 'mi-muro.secreto',
      resave: true,
      saveUninitialized: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Muro de Notas API')
    .setDescription('Este API tiene como finalidad almacenar y compartir tus ideas con el mundo.')
    .setVersion('1.0')
    .addTag('Muro')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
