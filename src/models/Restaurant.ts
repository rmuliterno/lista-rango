import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('restaurants')
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
	id: string;

  @Column()
	name: string;

  @Column()
	photo: string;

  @Column()
	address: string;

  @Column('timestamp with time zone')
	regularHoursStart: Date;

  @Column('timestamp with time zone')
	regularHoursEnd: Date;

  @Column('timestamp with time zone')
	specialHoursStart: Date;

  @Column('timestamp with time zone')
  specialHoursEnd: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Restaurant;
