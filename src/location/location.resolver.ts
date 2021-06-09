import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Location } from './graphql/types/location.type';
import { CreateLocationInput } from './graphql/inputs/create-location.input';
import { UpdateLocationInput } from './graphql/inputs/update-location.input';
import { LocationService } from './location.service';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';

@Resolver((_of) => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query((_returns) => Location)
  public async getLocationById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Location> {
    return this.locationService.getEntityById({ id });
  }

  @Query((_returns) => [Location])
  public async getAllLocations(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Location[]> {
    return this.locationService.getAllEntities(filterInput);
  }

  @Mutation((_of) => Location)
  public async createLocation(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationService.createEntity(createLocationInput);
  }

  @Mutation((_of) => Location)
  public async updateLocation(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    return this.locationService.updateEntity(updateLocationInput);
  }

  @Mutation((_of) => Location)
  public async deleteLocation(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Location> {
    return this.locationService.deleteEntity({ id });
  }
}
