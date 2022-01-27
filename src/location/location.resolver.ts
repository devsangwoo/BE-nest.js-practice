import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Location } from './graphql/types/location.type';
import { CreateLocationInput } from './graphql/inputs/create-location.input';
import { UpdateLocationInput } from './graphql/inputs/update-location.input';
import { LocationService } from './location.service';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from 'src/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { CLIENT } from 'src/common/auth/arrays/authorized-roles.arrays';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @AuthorizedRoles(...CLIENT)
  @Query(() => Location)
  public async getLocationById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Location> {
    return await this.locationService.getEntityById({ id });
  }

  @AuthorizedRoles(...CLIENT)
  @Query(() => [Location])
  public async getAllLocations(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Location[]> {
    return await this.locationService.getAllEntities(filterInput);
  }

  @AuthorizedRoles(...CLIENT)
  @Mutation(() => Location)
  public async createLocation(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return await this.locationService.createEntity(createLocationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Location)
  public async updateLocation(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    return await this.locationService.updateEntity(updateLocationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Location)
  public async deleteLocation(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Location> {
    return await this.locationService.deleteEntity({ id });
  }
}
