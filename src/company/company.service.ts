import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { CompanyRepository } from './company.repository';
import { IBrandServiceType } from './interfaces/types/company-service-type.interface';

@Injectable()
export class CompanyService extends Service<IBrandServiceType> {
  constructor(private readonly companyRepository: CompanyRepository) {
    super(companyRepository);
  }
}
