import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';
import { CompanyRepository } from 'src/company/company.repository';
import { Company } from 'src/company/database/company.entity';
import { CreateCompanyInput } from 'src/company/graphql/inputs/create-company.input';
import { UpdateCompanyInput } from 'src/company/graphql/inputs/update-company.input';

export interface ICompanyServiceType extends BaseServiceType {
  entity: Company;
  entityRepository: CompanyRepository;
  createEntityInput: CreateCompanyInput;
  updateEntityInput: UpdateCompanyInput;
}
