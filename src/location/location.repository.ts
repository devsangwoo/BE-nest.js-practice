import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'src/common/data/classes/repository.class';
import { Location } from './database/location.entity';
import { ILocationRepositoryType } from './interfaces/types/location-repository-type.interface';

@Injectable()
export class LocationRepository extends Repository<ILocationRepositoryType> {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
  ) {
    super(locationModel, Location.name);
  }
}
