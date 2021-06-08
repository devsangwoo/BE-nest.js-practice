import { Model } from 'mongoose';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';
import { Country } from '../../database/country.entity';
import { CreateCountryInput } from '../../graphql/inputs/create-country.input';
import { UpdateCountryInput } from '../../graphql/inputs/update-country.input';

export interface ICountryRepositoryType extends BaseRepositoryType {
  entity: Country;
  entityModel: Model<Country>;
  createEntityInput: CreateCountryInput;
  updateEntityInput: UpdateCountryInput;
}
