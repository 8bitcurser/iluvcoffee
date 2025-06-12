import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    private coffee: Coffee[] = [
        {
            id: 1,
            name: 'Cappuccino',
            brand: 'Nest',
            flavors: ['chocolate', 'vanilla'],
        },
        {
            id: 2,
            name: 'Latte',
            brand: 'Nest',
            flavors: ['hazelnut', 'caramel'],
        },
        {
            id: 3,
            name: 'Espresso',
            brand: 'Nest',
            flavors: ['strong', 'bitter'],
        }
    ];

    findAll() {
        return this.coffee;
    }
    findOne(id: number) {
       const coffee =  this.coffee.find(coffee => coffee.id === id);
       if (!coffee) {
           throw new NotFoundException(`Coffee with ID ${id} not found`);
       }
       return coffee;
    }
    create(coffeeDto: CreateCoffeeDto) {
        const coffee = new Coffee()
        Object.assign(
            coffee,
            coffeeDto
        );
        coffee.id = this.coffee.length + 1;
         // simple ID generation
        this.coffee.push(coffee);
        return coffee;
    }
    update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
        // update the existing entity
            Object.assign(existingCoffee, updateCoffeeDto);
            return existingCoffee;
        }
    }

    remove(id: number) {
        const index = this.coffee.findIndex(coffee => coffee.id === id);
        if (index >= 0) {
            this.coffee.splice(index, 1);
            return { deleted: true };
        }
        return { deleted: false };
    }

}
