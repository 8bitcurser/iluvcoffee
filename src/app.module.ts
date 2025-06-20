if (!global.crypto) {
  global.crypto = require('crypto');
}

import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi'; // Joi para validacion de configuracion
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema:   Joi.object(
        {
          DATABASE_HOST: Joi.string().required(),
          DATABASE_PORT: Joi.number().default(5432),
          DATABASE_USER: Joi.string().required(),
          DATABASE_PASSWORD: Joi.string().required(),
          DATABASE_NAME: Joi.string().required(),
        }
      ),
      load: [appConfig] // puedes definir un esquema de validacion si lo necesitas
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // importa el ConfigModule para acceder a las variables de entorno
      useFactory: (configService: ConfigService ) => ({
      type: 'postgres', // tipo de base de datos
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'), 
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      autoLoadEntities: true, // carga automaticamente las entidades de los modulos
      synchronize: true, // no usar en produccion, solo para desarrollo
    }),
    inject: [ConfigService],
  }),
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
