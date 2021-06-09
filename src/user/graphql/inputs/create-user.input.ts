import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { ICreateUserInput } from '../../interfaces/create-user-input.interface';

@InputType()
export class CreateUserInput implements ICreateUserInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field(_type => UserRoles, { nullable: true })
  role: UserRoles;

  @Field()
  password: string;
}
