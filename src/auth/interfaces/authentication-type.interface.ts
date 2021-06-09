import { IUser } from '../../user/interfaces/user-entity.interface';

export interface IAuthenticationType {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
