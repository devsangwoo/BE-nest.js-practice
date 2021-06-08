import { Model } from 'mongoose';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';
import { Location } from '../../database/location.entity';
import { CreateLocationInput } from '../../graphql/inputs/create-location.input';
import { UpdateLocationInput } from '../../graphql/inputs/update-location.input';

export interface ILocationRepositoryType extends BaseRepositoryType {
  entity: Location;
  entityModel: Model<Location>;
  createEntityInput: CreateLocationInput;
  updateEntityInput: UpdateLocationInput;
}
