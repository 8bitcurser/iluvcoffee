import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist: true, forbidNonWhitelisted: true, transform: true, transformOptions: {
      enableImplicitConversion: true, // permite la conversion implicita de tipos de datos
    }}, 
    // permite solo los campos definidos en el DTO
    // filtra los campos que no estan definidos en el DTO
    // forbidNonWhitelisted: true
    // si se envia un campo que no esta definido en el DTO, devuelve un error
    // transform: true convierte los tipos de datos de los parametros
    // en el DTO, sino el payload tiene forma del DTO pero no es un objeto
    // del tipo del DTO.
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
