import { SetMetadata } from '@nestjs/common';

export const AUTHORIZED_ROLES_KEY = 'AuthorizedRoles';
export const AuthorizedRoles = (...authorizedRoles: string[]) => SetMetadata(AUTHORIZED_ROLES_KEY, authorizedRoles);
