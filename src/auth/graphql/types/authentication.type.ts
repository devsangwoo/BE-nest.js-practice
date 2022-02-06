import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/graphql/types/user.type';
import { IAuthenticationType } from '../../interfaces/authentication-type.interface';

@ObjectType()
export class AuthenticationType implements IAuthenticationType {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
