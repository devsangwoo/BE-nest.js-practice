import { Repository } from '@common/common/data/classes/repository.class';
import { LoggerService } from '@common/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './database/location.entity';
import { ILocationRepositoryType } from './interfaces/types/location-repository-type.interface';

@Injectable()
export class LocationRepository extends Repository<ILocationRepositoryType> {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
  ) {
    super(loggerService, locationModel, Location.name);
  }
}
