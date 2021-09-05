import { UserRoles } from '@modules/users/schema/IUser';

export interface ICreateUserDTO {
  name: string;
  user_name: string;
  password: string;
  cnpj: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  first_access: boolean;
  role: UserRoles;
}
