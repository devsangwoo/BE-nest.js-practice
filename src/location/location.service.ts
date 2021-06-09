import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { ILocationServiceType } from './interfaces/types/location-service-type.interface';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService extends Service<ILocationServiceType> {
  constructor(private readonly locationRepository: LocationRepository) {
    super(locationRepository);
  }
}
