import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Country } from './graphql/types/country.type';
import { CreateCountryInput } from './graphql/inputs/create-country.input';
import { UpdateCountryInput } from './graphql/inputs/update-country.input';
import { CountryService } from './country.service';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { AuthorizedRoles } from 'src/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { CLIENT } from 'src/common/auth/arrays/authorized-roles.arrays';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => Country)
  public async getCountryById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Country> {
    return this.countryService.getEntityById({ id });
  }

  @AuthorizedRoles(...CLIENT)
  @Query(() => [Country])
  public async getAllCountries(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Country[]> {
    return this.countryService.getAllEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Country)
  public async createCountry(
    @Args(GraphQlFieldNames.INPUT_FIELD) createCountryInput: CreateCountryInput,
  ): Promise<Country> {
    return this.countryService.createEntity(createCountryInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Country)
  public async updateCountry(
    @Args(GraphQlFieldNames.INPUT_FIELD) updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    return this.countryService.updateEntity(updateCountryInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Country)
  public async deleteCountry(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Country> {
    return this.countryService.deleteEntity({ id });
  }
}
