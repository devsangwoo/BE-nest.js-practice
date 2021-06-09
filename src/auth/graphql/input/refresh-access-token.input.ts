import { Field, InputType } from '@nestjs/graphql';
import { IRefreshAccessTokenInput } from 'src/auth/interfaces/refresh-access-token-input.interface';

@InputType()
export class RefreshAccessTokenInput implements IRefreshAccessTokenInput {
  @Field()
  refreshToken: string;
}
