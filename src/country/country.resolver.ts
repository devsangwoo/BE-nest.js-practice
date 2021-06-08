import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Country } from './graphql/types/country.type';
import { CreateCountryInput } from './graphql/inputs/create-country.input';
import { UpdateCountryInput } from './graphql/inputs/update-country.input';
import { CountryService } from './country.service';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';

@Resolver((__of) => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query((_returns) => Country)
  public async getCountryById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Country> {
    return this.countryService.getEntityById({ id });
  }

  @Query((_returns) => [Country])
  public async getAllCountries(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Country[]> {
    return this.countryService.getAllEntities(filterInput);
  }

  @Mutation((_of) => Country)
  public async createCountry(
    @Args(GraphQlFieldNames.INPUT_FIELD) createCountryInput: CreateCountryInput,
  ): Promise<Country> {
    return this.countryService.createEntity(createCountryInput);
  }

  @Mutation((_of) => Country)
  public async updateCountry(
    @Args(GraphQlFieldNames.INPUT_FIELD) updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    return this.countryService.updateEntity(updateCountryInput);
  }

  @Mutation((_of) => Country)
  public async deleteCountry(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Country> {
    return this.countryService.deleteEntity({ id });
  }
}
