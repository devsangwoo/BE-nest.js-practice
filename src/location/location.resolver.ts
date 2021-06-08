import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Location } from './graphql/types/location.type';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { CreateLocationInput } from './graphql/inputs/create-location.input';
import { UpdateLocationInput } from './graphql/inputs/update-location.input';
import { LocationService } from './location.service';
import { GraphQlFieldNames } from '@common/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@common/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@common/common/graphql/types/graphql-filter-options';
import { Public } from '@common/common/auth/decorators/public-resource.decorator';
import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import { UPLOADER } from '@common/common/auth/arrays/authorized-roles.arrays';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';

@Resolver(_of => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @Query(_returns => Location)
  public async getLocationById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Location> {
    return this.locationService.getEntityById({ id });
  }

  @Public()
  @Query(_returns => [Location])
  public async getAllLocations(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Location[]> {
    return this.locationService.getAllEntities(filterInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation(_of => Location)
  public async createLocation(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationService.createEntity(createLocationInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation(_of => Location)
  public async updateLocation(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    return this.locationService.updateEntity(updateLocationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => Location)
  public async deleteLocation(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Location> {
    return this.locationService.deleteEntity({ id });
  }
}
