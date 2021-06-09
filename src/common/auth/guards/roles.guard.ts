import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BadImplementationException } from 'src/common/errors/errors';
import { AUTHORIZED_ROLES_KEY } from '../decorators/authorized-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authorizedRoles = this.reflector.get<string[]>(
      AUTHORIZED_ROLES_KEY,
      context.getHandler(),
    );

    if (!authorizedRoles) return true;

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();

    if (!request.user) throw new BadImplementationException();

    return authorizedRoles.includes(request.user.role);
  }
}
