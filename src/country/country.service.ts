import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { ICountryServiceType } from './interfaces/types/country-service-type.interface';
@Injectable()
export class CountryService extends Service<ICountryServiceType> {
  constructor(private readonly countryRepository: CountryRepository) {
    super(countryRepository);
  }
}
