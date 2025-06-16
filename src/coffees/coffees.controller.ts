import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
    // el servicio es lo que se encarga de la logica de negocio
    // y de itneractuar con la base de datos
    constructor(private readonly coffeesService: CoffeesService) {
        console.log('CoffeesController initialized');
    }
    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto;
        return this.coffeesService.findAll(paginationQueryDto);
    }

    @Get(':id')
    findOne (@Param('id') id: string) {
        return this.coffeesService.findOne(+id);
    }

    // @Body('name') filtra todo del payload menos la key name 
    @Post()
    // @HttpCode(HttpStatus.GONE)
    create (@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
        return this.coffeesService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(+id);
    }
}
