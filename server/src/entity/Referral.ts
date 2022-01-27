
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("referrals")
export class Referral extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    code: string;

    @Column("integer", {default: 1})
    visits: number;

    @UpdateDateColumn()
    date_changed: string;

}