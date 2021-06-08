import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { CompanyRepository } from './customer.repository';
import { ICompanyServiceType } from './interfaces/types/customer-service-type.interface';

@Injectable()
export class CompanyService extends Service<ICompanyServiceType> {
  constructor(private readonly companyRepository: CompanyRepository) {
    super(companyRepository);
  }
}
