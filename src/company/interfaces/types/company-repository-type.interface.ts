import { Model } from 'mongoose';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';
import { Company } from 'src/company/database/company.entity';
import { CreateCompanyInput } from 'src/company/graphql/inputs/create-company.input';
import { UpdateCompanyInput } from 'src/company/graphql/inputs/update-company.input';

export interface ICompanyRepositoryType extends BaseRepositoryType {
  entity: Company;
  entityModel: Model<Company>;
  createEntityInput: CreateCompanyInput;
  updateEntityInput: UpdateCompanyInput;
}
