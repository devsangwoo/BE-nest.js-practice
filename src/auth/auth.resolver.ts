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
import { UpdatePasswordInput } from './graphql/input/update-password.input';
import { UpdatePasswordPayload } from './graphql/input/update-password.payload';
import { SignUpUserInput } from './graphql/input/sign-up-user.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation((_of) => AuthenticationType)
  public async signUpUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signUpUserInput: SignUpUserInput,
  ): Promise<AuthenticationType> {
    return await this.authService.signUpUser(signUpUserInput);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation((_of) => AuthenticationType)
  public async signInUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signInUserInput: CreateCredentialInput,
    @CurrentUser() user: UserEntity,
  ): Promise<AuthenticationType> {
    return await this.authService.signInUser(user);
  }

  @Mutation((_of) => User)
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

    return await this.authService.updatePassword(updatePasswordInput);
  }

  @Query((_returns) => User)
  public async self(
    @CurrentUser()
    jwtPayload: JwtPayload,
  ): Promise<User> {
    return await this.userService.getEntityById({ id: jwtPayload.id });
  }
}
