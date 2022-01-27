import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    email: string;

    @Column("text")
    username: string;

    @Column("text")
    password: string;

    @Column("text", {nullable: true})
    stripe_session_id: string;

    @Column("text", {default: "unpaid"})
    type: string;

    @Column("text", {nullable: true})
    parent_first_name: string;

    @Column("text", {nullable: true})
    parent_last_name: string;

    @Column("text", {nullable: true})
    child_first_name: string;

    @Column("text", {nullable: true})
    child_last_name: string;

    @Column("text", {nullable: true})
    child_age: string;

    @Column("date", {nullable: true})
    signup_date: string;

    @Column("integer", {nullable: true})
    referral_id: number;

}