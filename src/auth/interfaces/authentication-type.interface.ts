import { IUser } from 'src/user/interfaces/user-entity.interface';

export interface IAuthenticationType {
  accessToken: string;
  user: IUser;
}
