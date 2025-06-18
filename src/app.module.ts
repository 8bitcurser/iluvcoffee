import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'; // Joi para validacion de configuracion
import appConfig from './config/app.config';


@Module({
  imports: [

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
      type: 'postgres', // tipo de base de datos
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!, 
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // carga automaticamente las entidades de los modulos
      synchronize: true, // no usar en produccion, solo para desarrollo
    })}),
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
    CoffeesModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
