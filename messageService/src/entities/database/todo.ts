import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity";


@Entity()
export class Todo extends BaseEntity {
    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    content!: string;
}
