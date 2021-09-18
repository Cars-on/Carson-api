import { ObjectId } from 'mongodb';

enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
interface IUser {
  id: ObjectId;
  cnpj: string;
  cpf: string;
  name: string;
  user_name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  password: string;
  first_access: boolean;
  role?: UserRoles;
  lot: string;
}

export { IUser, UserRoles };
