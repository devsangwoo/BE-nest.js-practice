import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';
import { CountryRepository } from '../../country.repository';
import { Country } from '../../database/country.entity';
import { CreateCountryInput } from '../../graphql/inputs/create-country.input';
import { UpdateCountryInput } from '../../graphql/inputs/update-country.input';

export interface ICountryServiceType extends BaseServiceType {
  entity: Country;
  entityRepository: CountryRepository;
  createEntityInput: CreateCountryInput;
  updateEntityInput: UpdateCountryInput;
}
