import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Restaurant;
