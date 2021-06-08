import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ILocationServiceType } from './interfaces/types/location-service-type.interface';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService extends Service<ILocationServiceType> {
  constructor(private readonly pathRepository: LocationRepository) {
    super(pathRepository);
  }
}
