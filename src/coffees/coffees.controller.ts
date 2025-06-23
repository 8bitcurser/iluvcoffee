import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { WrapResponseInterceptor } from '../common/interceptors/wrap-response.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// @UseInterceptors(WrapResponseInterceptor)
// @UseGuards(ApiKeyGuard)
@ApiTags('coffees') // Swagger tag for grouping endpoints
@UseFilters(HttpExceptionFilter)
@Controller('coffees')
export class CoffeesController {
    // el servicio es lo que se encarga de la logica de negocio
    // y de itneractuar con la base de datos
    constructor(private readonly coffeesService: CoffeesService) {
    }
    
    // @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Public()
    @Get()
    findAll(@Protocol() protocol: string, @Query() paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto;
        console.log(`Protocol: ${protocol}`);
        return this.coffeesService.findAll(paginationQueryDto);
    }
    @Public()
    @Get(':id')
    findOne (@Param('id', ParseIntPipe) id: string) {
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
