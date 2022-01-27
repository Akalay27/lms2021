import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("code-entries")
export class CodeEntry extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer", {nullable: true})
    user: number

    @Column("integer")
    exercise_uid: number

    @Column("text", {default: ""})
    code: string

    @UpdateDateColumn()
    date_changed: string;

    @Column("boolean", {nullable: true})
    template: boolean

    @Column("text", {default: "unopened"})
    status: string
}