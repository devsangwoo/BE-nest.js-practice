import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { ICreateUserInput } from '../../interfaces/create-user-input.interface';

@InputType()
export class CreateUserInput implements ICreateUserInput {
  @Field()
  email: string;

  @Field((_type) => UserRoles, { nullable: true })
  role: UserRoles;

  @Field()
  password: string;
}
