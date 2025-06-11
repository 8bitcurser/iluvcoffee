import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
    // el servicio es lo que se encarga de la logica de negocio
    // y de itneractuar con la base de datos
    constructor(private readonly coffeesService: CoffeesService) {
        console.log('CoffeesController initialized');
    }
    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        console.log(limit, offset);
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne (@Param('id') id: string) {
        return this.coffeesService.findOne(+id);
    }

    // @Body('name') filtra todo del payload menos la key name 
    @Post()
    // @HttpCode(HttpStatus.GONE)
    create (@Body() body: any) {
        return this.coffeesService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.coffeesService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(+id);
    }
}
