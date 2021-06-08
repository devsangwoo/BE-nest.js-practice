import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Company } from './graphql/types/company.type';
import { CreateCompanyInput } from './graphql/inputs/create-company.input';
import { UpdateCompanyInput } from './graphql/inputs/update-company.input';
import { CompanyService } from './company.service';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';

@Resolver((_of) => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query((_returns) => Company)
  public async getBrandById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Company> {
    return this.companyService.getEntityById({ id });
  }

  @Query((_returns) => [Company])
  public async getAllBrands(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Company[]> {
    return this.companyService.getAllEntities(filterInput);
  }

  @Mutation((_of) => Company)
  public async createCompany(
    @Args(GraphQlFieldNames.INPUT_FIELD) createCompanyInput: CreateCompanyInput,
  ): Promise<Company> {
    return this.companyService.createEntity(createCompanyInput);
  }

  @Mutation((_of) => Company)
  public async updateBrand(
    @Args(GraphQlFieldNames.INPUT_FIELD) updateCompanyInput: UpdateCompanyInput,
  ): Promise<Company> {
    return this.companyService.updateEntity(updateCompanyInput);
  }

  @Mutation((_of) => Company)
  public async deleteCompany(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Company> {
    return this.companyService.deleteEntity({ id });
  }
}
