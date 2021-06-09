import { UserRoles } from 'src/common/auth/enums/user-roles.enum';

export interface IUser {
  id: string;
  email: string;
  role: UserRoles;
}
