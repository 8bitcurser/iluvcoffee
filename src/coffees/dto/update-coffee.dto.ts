import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "./create-coffee.dto";


// partial type permite que todos los campos sean opcionales
// y hereda las validaciones de CreateCoffeeDto
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
