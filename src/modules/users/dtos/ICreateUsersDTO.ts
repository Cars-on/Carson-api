import { UserRoles } from '@modules/users/schemas/IUser';

export interface ICreateUsersDTO {
  cnpj: string;
  cpf: string;
  name: string;
  user_name: string;
  email: string;
  phone: string;
  address: string;
  state: string;

  password?: string;
  first_access?: boolean;
  role?: UserRoles;
  lot?: string;
}
