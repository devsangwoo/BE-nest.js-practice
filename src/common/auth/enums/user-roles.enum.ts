import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  CLIENT = 'client',
  ADMIN = 'admin',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
