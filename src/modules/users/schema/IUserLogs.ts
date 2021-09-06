import { ObjectId } from 'mongodb';

interface IUserLog {
  id: ObjectId;
  cnpj?: string;
  cpf?: string;
  name?: string;
  user_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  error: string;
  line: number;
}

export { IUserLog };
