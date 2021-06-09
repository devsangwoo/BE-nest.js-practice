import { InputType, Field } from '@nestjs/graphql';
import { AuthProviders, AuthType } from 'src/auth/utils/auth-providers.enum';
import { ISignUpUserInput } from '../../interfaces/sign-up-user-input.interface';

@InputType()
export class SignUpUserInput implements ISignUpUserInput {
  @Field()
  email: string;

  @Field()
  password?: string;

  socialProvider?: AuthProviders;

  authType?: AuthType;
}
