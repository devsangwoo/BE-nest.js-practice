import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Brand } from './graphql/types/company.type';
import { CreateBrandInput } from './graphql/inputs/create-company.input';
import { UpdateBrandInput } from './graphql/inputs/update-company.input';
import { BrandService } from './company.service';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';

@Resolver((_of) => Company)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query((_returns) => Brand)
  public async getBrandById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Brand> {
    return this.brandService.getEntityById({ id });
  }

  @Query((_returns) => [Brand])
  public async getAllBrands(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Brand[]> {
    return this.brandService.getAllEntities(filterInput);
  }

  @Mutation((_of) => Brand)
  public async createBrand(
    @Args(GraphQlFieldNames.INPUT_FIELD) createBrandInput: CreateBrandInput,
  ): Promise<Brand> {
    return this.brandService.createEntity(createBrandInput);
  }

  @Mutation((_of) => Brand)
  public async updateBrand(
    @Args(GraphQlFieldNames.INPUT_FIELD) updateBrandInput: UpdateBrandInput,
  ): Promise<Brand> {
    return this.brandService.updateEntity(updateBrandInput);
  }

  @Mutation((_of) => Brand)
  public async deleteBrand(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Brand> {
    return this.brandService.deleteEntity({ id });
  }
}
