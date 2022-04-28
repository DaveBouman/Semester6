import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BaseEntity } from './baseEntity';

@Entity()
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: true })
    socialId!: string;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    familyName!: string;

    @Column({ nullable: true })
    email!: string;

    @Column({ nullable: true })
    imageUrl!: string;

    @Column({ nullable: true })
    social!: string;

    @Column({ nullable: true })
    password!: string;

    @OneToMany(() => BaseEntity, base => base.createdBy)
    createdBy!: BaseEntity[];

    @OneToMany(() => BaseEntity, base => base.updatedBy)
    updatedBy!: BaseEntity[];
}