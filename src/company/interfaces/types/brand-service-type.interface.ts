import { BrandRepository } from 'src/brand/brand.repository';
import { Brand } from 'src/brand/database/brand.entity';
import { CreateBrandInput } from 'src/brand/graphql/inputs/create-brand.input';
import { UpdateBrandInput } from 'src/brand/graphql/inputs/update-brand.input';
import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';

export interface IBrandServiceType extends BaseServiceType {
  entity: Brand;
  entityRepository: BrandRepository;
  createEntityInput: CreateBrandInput;
  updateEntityInput: UpdateBrandInput;
}
