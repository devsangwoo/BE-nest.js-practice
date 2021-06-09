import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { IUser } from '../../interfaces/user-entity.interface';

@ObjectType()
export class User implements IUser {
  @Field((_type) => ID)
  id: string;

  @Field()
  email: string;

  @Field((_type) => UserRoles)
  role: UserRoles;
}
