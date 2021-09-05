import { UserRoles } from '@modules/users/schema/IUser';

export interface ICreateUserDTO {
  cnpj: string;
  cpf: string;
  name: string;
  user_name: string;
  email: string;
  phone: string;
  address: string;

  password?: string;
  first_access?: boolean;
  role?: UserRoles;
}
