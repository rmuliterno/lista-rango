import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  restaurant_id: string;

  @Column()
	picture: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column()
	name: string;

  @Column()
	price: number;

  @Column()
  category: string;

  @Column()
  sale: string;

  @Column()
  saleDescription: string;

  @Column()
  salePrice: number;

  @Column({ type: 'text', array: true, nullable: true })
  saleDays: string[];

  @Column()
  saleStart: string;

  @Column()
  saleEnd: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
