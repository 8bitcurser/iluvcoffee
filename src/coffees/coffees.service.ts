import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { ConfigType } from '@nestjs/config';
import coffeesConfig from '../coffee-rating/coffees.config';


@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor) // Si se usa Flavor en el servicio, se debe inyectar
        private readonly flavorRepository: Repository<Flavor>, // Si se usa Flavor en el servicio, se debe inyectar
        private readonly dataSource: DataSource,
        // @Inject(COFFEE_BRANDS) coffeBrands: string[], // Inyectamos el token COFFEE_BRANDS
        // @Inject(coffeesConfig.KEY)
        // private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>, // Inyectamos ConfigService para acceder a las variables de entorno
    ) {};

    
    async findAll(paginationQueryDto: PaginationQueryDto) {
        return this.coffeeRepository.find({
            relations: {flavors: true},
            skip: paginationQueryDto.offset,
            take: paginationQueryDto.limit,
        });
    }

    async findOne(id: number) {
       const coffee =  await this.coffeeRepository.findOne({
            where: { id },
            relations: { flavors: true },
    });
       if (!coffee) {
           throw new NotFoundException(`Coffee with ID ${id} not found`);
       }
       return coffee;
    }

    async create(coffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            coffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );
        
        const coffee = this.coffeeRepository.create({...coffeeDto, flavors});
        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors =
            updateCoffeeDto.flavors &&
            (await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
            ));


        const coffee = await this.coffeeRepository.preload({
            id,
            ...updateCoffeeDto,
            flavors
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee with ID ${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: number) {
        const coffee = await this.findOne(id);
        if (!coffee) {
            throw new NotFoundException(`Coffee with ID ${id} not found`);
        } 
        return this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }

    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++;
            const recommendEvent = new Event();
            recommendEvent.name = "recommend_coffee";
            recommendEvent.type = "coffee";
            recommendEvent.payload = { coffeeId: coffee.id };
            const coffeeWithRecommendations = await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
            return coffeeWithRecommendations;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

}
