import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';
import { CompanyRepository } from 'src/company/company.repository';
import { Company } from 'src/company/database/company.entity';

export interface ICompanyServiceType extends BaseServiceType {
  entity: Company;
  entityRepository: CompanyRepository;
  createEntityInput: any;
  updateEntityInput: any;
}
