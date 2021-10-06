import { ObjectId } from 'mongodb';
import { uuid } from 'uuidv4';

import {
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Generated,
  BeforeInsert,
} from 'typeorm';

import { IUserToken } from '@modules/users/schemas';

@Entity('users_token')
class UserToken implements IUserToken {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('varchar')
  user_id: string;

  @Column('varchar')
  @Generated('uuid')
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  beforeInsertActions?(): void {
    if (!this.token) this.token = uuid();
  }
}

export { UserToken };
