import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'src/common/data/classes/repository.class';
import { Country } from '../country/database/country.entity';
import { ICountryRepositoryType } from './interfaces/types/country-repository-type.interface';

@Injectable()
export class CountryRepository extends Repository<ICountryRepositoryType> {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {
    super(countryModel, Country.name);
  }
}
