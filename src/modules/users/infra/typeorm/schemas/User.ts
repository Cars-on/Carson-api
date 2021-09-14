import { ObjectId } from 'mongodb';

import crypto from 'crypto';

import {
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  BeforeInsert,
} from 'typeorm';

import { IUser, UserRoles } from '@modules/users/schema/IUser';

@Entity('users')
class User implements IUser {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('varchar')
  name: string;

  @Column('varchar')
  user_name: string;

  @Column('varchar')
  password: string;

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

  @Column('boolean', { default: true })
  first_access: boolean;

  @Column('enum', { enum: UserRoles, default: UserRoles.USER })
  role: UserRoles | undefined;

  @Column('varchar')
  lot: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  beforeInsertActions?(): void {
    const newPassord = crypto.randomBytes(3).toString('hex');
    if (!this.password) this.password = newPassord.toString();
    if (!this.role) this.role = UserRoles.USER;
    if (!this.first_access) this.first_access = true;
  }
}

export { User };
