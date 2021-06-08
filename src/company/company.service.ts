import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { BrandRepository } from './company.repository';
import { IBrandServiceType } from './interfaces/types/brand-service-type.interface';

@Injectable()
export class BrandService extends Service<IBrandServiceType> {
  constructor(private readonly brandRepository: BrandRepository) {
    super(brandRepository);
  }
}
