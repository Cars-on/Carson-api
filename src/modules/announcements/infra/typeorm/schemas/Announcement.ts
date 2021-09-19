import { IAnnouncement } from '@modules/announcements/schemas/IAnnouncement';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('announcements')
class Announcement implements IAnnouncement {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('varchar')
  user_id: string;

  @Column('varchar')
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

  @Column()
  description: string;

  @Column()
  lot: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Announcement };
