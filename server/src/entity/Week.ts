import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity("weeks")
export class Week extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    date: string;

    @Column("integer")
    capacity: number;

    @Column("integer", {default: 0})
    students: number;

}
