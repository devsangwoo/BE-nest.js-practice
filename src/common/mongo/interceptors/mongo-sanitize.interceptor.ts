import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as MongoSanitize from 'express-mongo-sanitize';

const GRAPHQL_CONTEXT: GqlContextType = 'graphql';
@Injectable()
export class MongoSanitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = <GqlContextType>context.getType();

    if (contextType === GRAPHQL_CONTEXT) {
      const ctx = GqlExecutionContext.create(context);

      MongoSanitize.sanitize(ctx.getArgs());
    }

    return next.handle();
  }
}
