import { ObjectId } from 'mongodb';

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
}

export { IUser };
