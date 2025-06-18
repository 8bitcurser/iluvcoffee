import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity'; 
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from 'src/coffee-rating/coffees.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffeesConfig)
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nestcafe']}],
    exports: [CoffeesService] // Exportamos el servicio para que pueda ser usado en otros modulos
})
export class CoffeesModule {}
