import { AuthProviders } from '../utils/auth-providers.enum';

export interface ISignUpUserInput {
  email: string;
  password?: string;
  socialProvider?: AuthProviders;
}
