import { ObjectId } from 'mongodb';

import {
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

import { IUserLogs } from '@modules/users/schemas/IUserLogs';

@Entity('user_logs')
class UserLog implements IUserLogs {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('varchar')
  name: string;

  @Column('varchar')
  user_name: string;

  @Column('varchar')
  cnpj: string;

  @Column('varchar')
  cpf: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  state: string;

  @Column('varchar')
  error: string[];

  @Column('number')
  line: number;

  @Column('varchar')
  lot: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { UserLog };
