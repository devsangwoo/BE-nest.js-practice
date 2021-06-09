import { UserRoles } from 'src/common/auth/enums/user-roles.enum';

export interface ICreateUserInput {
  name: string;
  lastName: string;
  email: string;
  telephoneNumber?: string;
  role: UserRoles;
  password: string;
}
