import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Country } from './graphql/types/country.type';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { CreateCountryInput } from './graphql/inputs/create-country.input';
import { UpdateCountryInput } from './graphql/inputs/update-country.input';
import { CountryService } from './country.service';
import { GraphQlFieldNames } from '@common/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@common/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@common/common/graphql/types/graphql-filter-options';
import { Public } from '@common/common/auth/decorators/public-resource.decorator';
import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { UPLOADER } from '@common/common/auth/arrays/authorized-roles.arrays';

@Resolver(__of => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @Query(_returns => Country)
  public async getCountryById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Country> {
    return this.countryService.getEntityById({ id });
  }

  @Public()
  @Query(_returns => [Country])
  public async getAllCountries(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Country[]> {
    return this.countryService.getAllEntities(filterInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation(_of => Country)
  public async createCountry(
    @Args(GraphQlFieldNames.INPUT_FIELD) createCountryInput: CreateCountryInput,
  ): Promise<Country> {
    return this.countryService.createEntity(createCountryInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation(_of => Country)
  public async updateCountry(
    @Args(GraphQlFieldNames.INPUT_FIELD) updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    return this.countryService.updateEntity(updateCountryInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => Country)
  public async deleteCountry(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Country> {
    return this.countryService.deleteEntity({ id });
  }
}
