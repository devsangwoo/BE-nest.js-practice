import { UserRoles } from 'src/common/auth/enums/user-roles.enum';

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  role: UserRoles;
}
