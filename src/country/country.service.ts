import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { CountryRepository } from './country.repository';
import { ICountryServiceType } from './interfaces/types/country-service-type.interface';
@Injectable()
export class CountryService extends Service<ICountryServiceType> {
  constructor(private readonly countryRepository: CountryRepository) {
    super(countryRepository);
  }
}
