import { Model } from 'mongoose';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';
import { Company } from 'src/company/database/company.entity';

export interface ICompanyRepositoryType extends BaseRepositoryType {
  entity: Company;
  entityModel: Model<Company>;
  createEntityInput: any;
  updateEntityInput: any;
}
