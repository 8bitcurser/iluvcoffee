import { DataSource } from "typeorm";
import { CoffeeRefactor1749776848879 } from './src/migrations/1749776848879-CoffeeRefactor';
import { Event } from "src/events/entities/event.entity";
import { Flavor } from "src/coffees/entities/flavor.entity";
import { Coffee } from "src/coffees/entities/coffee.entity";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'iluvcoffee',
  password: 'iluvcoffee',
  database: 'iluvcoffee_db',
  entities: [Coffee, Flavor, Event],
  migrations: [CoffeeRefactor1749776848879],
});
