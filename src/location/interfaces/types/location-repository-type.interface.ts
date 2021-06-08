import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { Model } from 'mongoose';
import { Location } from '../../database/location.entity';
import { CreateLocationInput } from '../../graphql/inputs/create-location.input';
import { UpdateLocationInput } from '../../graphql/inputs/update-location.input';

export interface ILocationRepositoryType extends BaseRepositoryType {
  entity: Location;
  entityModel: Model<Location>;
  createEntityInput: CreateLocationInput;
  updateEntityInput: UpdateLocationInput;
}
