import { ObjectId } from 'mongodb';

interface IUserLogs {
  id: ObjectId;
  cnpj?: string;
  cpf?: string;
  name?: string;
  user_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  error: string[];
  line: number;
  lot: string;
}

export { IUserLogs };
