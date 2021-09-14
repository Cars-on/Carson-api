import { IAnnouncements } from '@modules/announcements/schema/IAnnouncement';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('announcements')
class Announcements implements IAnnouncements {
  @ObjectIdColumn()
  id: ObjectId;

  manufacturer: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  advertiser_code: string;

  @Column()
  manufacturer_year: string;

  @Column()
  brand_year: string;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  price: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Announcements };
