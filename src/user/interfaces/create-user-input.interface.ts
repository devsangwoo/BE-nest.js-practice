import { UserRoles } from 'src/common/auth/enums/user-roles.enum';

export interface ICreateUserInput {
  email: string;
  role: UserRoles;
  password: string;
}
