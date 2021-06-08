import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { CompanyRepository } from './company.repository';
import { ICompanyServiceType } from './interfaces/types/company-service-type.interface';

@Injectable()
export class CompanyService extends Service<ICompanyServiceType> {
  constructor(private readonly companyRepository: CompanyRepository) {
    super(companyRepository);
  }
}
