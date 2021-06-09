import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { AuthenticationType } from '../auth/graphql/types/authentication.type';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User as UserEntity } from '../user/database/user.entity';
import { Public } from 'src/common/auth/decorators/public-resource.decorator';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { CurrentUser } from 'src/common/auth/decorators/current-user.decorator';
import { CreateCredentialInput } from 'src/credential/graphql/inputs/create-credential.input';
import { User } from 'src/user/graphql/types/user.type';
import { JwtPayload } from 'src/common/auth/interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { UpdateSelfPayload } from './graphql/input/update-self.payload';
import { UpdateSelfInput } from './graphql/input/update-self.input';
import { TokensService } from './tokens.service';
import { RefreshAccessTokenInput } from './graphql/input/refresh-access-token.input';
import { AuthorizedRoles } from 'src/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { RevokeRefreshTokenType } from '../refresh-token/graphql/types/revoke-refresh-token.type';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { UpdatePasswordInput } from './graphql/input/update-password.input';
import { UpdatePasswordPayload } from './graphql/input/update-password.payload';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(_of => AuthenticationType)
  public async signInUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signInUserInput: CreateCredentialInput,
    @CurrentUser() user: UserEntity,
  ): Promise<AuthenticationType> {
    return this.authService.signInUser(user);
  }

  @Mutation(_of => User)
  public async updateSelf(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserPayload: UpdateSelfPayload,
  ): Promise<User> {
    const updateUserInput: UpdateSelfInput = {
      where: { id: jwtPayload.id },
      data: updateUserPayload,
    };

    return this.userService.updateEntity(updateUserInput);
  }

  @Mutation(_of => User)
  public async updatePassword(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updatePasswordPayload: UpdatePasswordPayload,
  ): Promise<boolean> {
    const updatePasswordInput: UpdatePasswordInput = {
      where: { email: jwtPayload.email },
      data: updatePasswordPayload,
    };

    return this.authService.updatePassword(updatePasswordInput);
  }

  @Query(_returns => User)
  public async self(
    @CurrentUser()
    jwtPayload: JwtPayload,
  ): Promise<User> {
    return this.userService.getEntityById({ id: jwtPayload.id });
  }

  @Public()
  @Mutation(_of => AuthenticationType)
  public async refreshAccessToken(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    refreshAccessTokenInput: RefreshAccessTokenInput,
  ): Promise<AuthenticationType> {
    return this.tokensService.refreshAccessToken(refreshAccessTokenInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => RevokeRefreshTokenType)
  public async revokeRefreshToken(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    revokeRefreshTokenInput: GetEntityByIdInput,
  ): Promise<RevokeRefreshTokenType> {
    return this.refreshTokenService.revokeRefreshToken(revokeRefreshTokenInput);
  }
}
