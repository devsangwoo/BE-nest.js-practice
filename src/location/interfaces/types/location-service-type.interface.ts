import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';
import { Location } from '../../database/location.entity';
import { CreateLocationInput } from '../../graphql/inputs/create-location.input';
import { UpdateLocationInput } from '../../graphql/inputs/update-location.input';
import { LocationRepository } from '../../location.repository';

export interface ILocationServiceType extends BaseServiceType {
  entity: Location;
  entityRepository: LocationRepository;
  createEntityInput: CreateLocationInput;
  updateEntityInput: UpdateLocationInput;
}
