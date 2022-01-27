import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("exercises")
export class Exercise extends BaseEntity {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column("integer")
    id: number

    @Column("text")
    title: string
    
    @Column("text")
    article: string

    status: string
    
}