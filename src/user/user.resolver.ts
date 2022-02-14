import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './graphql/types/user.type';
import { UserService } from './user.service';
import { AuthorizedRoles } from 'src/common/auth/decorators/authorized-roles.decorator';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { UpdateUserInput } from './graphql/inputs/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => User)
  public async getUserById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<User> {
    return this.service.getEntityById({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [User])
  public async getAllUsers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<User[]> {
    return this.service.getAllEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async createUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.service.createEntity(createUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async updateUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.service.updateEntity(updateUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async deleteUser(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<User> {
    return this.service.deleteEntity({ id });
  }
}
