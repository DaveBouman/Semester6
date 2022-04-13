import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export default class Role extends BaseEntity {

    @Column()
    premium!: boolean;

    @Column()
    role!: string;
}