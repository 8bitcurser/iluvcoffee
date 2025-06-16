import { Column, Entity, PrimaryGeneratedColumn, Index} from "typeorm";

@Index(['name', 'type']) // Index to ensure unique combinations of name and type
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;
}
