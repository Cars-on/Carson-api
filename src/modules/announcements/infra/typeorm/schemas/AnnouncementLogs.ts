import { IAnnouncementLogs } from '@modules/announcements/schemas/IAnnouncementLogs';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('announcements_logs')
class AnnouncementLogs implements IAnnouncementLogs {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('varchar')
  manufacturer: string;

  @Column('varchar')
  brand: string;

  @Column('varchar')
  model: string;

  @Column('varchar')
  advertiser_code: string;

  @Column('varchar')
  manufacturer_year: string;

  @Column('varchar')
  brand_year: string;

  @Column('varchar')
  cpf: string;

  @Column('varchar')
  cnpj: string;

  @Column('varchar')
  price: string;

  @Column('varchar')
  error: string[];

  @Column('number')
  line: number;

  @Column('varchar')
  description: string;

  @Column('varchar')
  lot: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { AnnouncementLogs };
