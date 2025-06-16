import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'iluvcoffee',
    password: 'iluvcoffee',
    database: 'iluvcoffee_db',
    autoLoadEntities: true, // carga automaticamente las entidades de los modulos
    synchronize: true, // no usar en produccion, solo para desarrollo
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
