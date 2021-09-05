import { ObjectId } from 'mongodb';

enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
interface IUser {
  id: ObjectId;
  name: string;
  user_name: string;
  password: string;
  cnpj: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  first_access: boolean;
  role?: UserRoles;
}

export { IUser, UserRoles };
