import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Brand } from './graphql/types/brand.type';
import { CreateBrandInput } from './graphql/inputs/create-brand.input';
import { UpdateBrandInput } from './graphql/inputs/update-brand.input';
import { BrandService } from './company.service';
import {
  TECHNICIAN,
  UPLOADER,
} from 'src/common/auth/arrays/authorized-roles.arrays';
import { AuthorizedRoles } from 'src/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';
import { Public } from 'src/common/auth/decorators/public-resource.decorator';

@Resolver((_of) => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @AuthorizedRoles(...TECHNICIAN)
  @Query((_returns) => Brand)
  public async getBrandById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Brand> {
    return this.brandService.getEntityById({ id });
  }

  @Public()
  @Query((_returns) => [Brand])
  public async getAllBrands(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Brand[]> {
    return this.brandService.getAllEntities(filterInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation((_of) => Brand)
  public async createBrand(
    @Args(GraphQlFieldNames.INPUT_FIELD) createBrandInput: CreateBrandInput,
  ): Promise<Brand> {
    return this.brandService.createEntity(createBrandInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation((_of) => Brand)
  public async updateBrand(
    @Args(GraphQlFieldNames.INPUT_FIELD) updateBrandInput: UpdateBrandInput,
  ): Promise<Brand> {
    return this.brandService.updateEntity(updateBrandInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation((_of) => Brand)
  public async deleteBrand(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Brand> {
    return this.brandService.deleteEntity({ id });
  }
}
