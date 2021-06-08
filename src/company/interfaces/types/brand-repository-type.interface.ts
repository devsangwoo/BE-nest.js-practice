import { Model } from 'mongoose';
import { Brand } from 'src/brand/database/brand.entity';
import { CreateBrandInput } from 'src/brand/graphql/inputs/create-brand.input';
import { UpdateBrandInput } from 'src/brand/graphql/inputs/update-brand.input';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';

export interface IBrandRepositoryType extends BaseRepositoryType {
  entity: Brand;
  entityModel: Model<Brand>;
  createEntityInput: CreateBrandInput;
  updateEntityInput: UpdateBrandInput;
}
