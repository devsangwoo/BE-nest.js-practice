import { Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { LocationResolver } from './location.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './database/location.entity';
import { LocationService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
    ]),
  ],
  providers: [LocationService, LocationRepository, LocationResolver],
  exports: [MongooseModule],
})
export class LocationModule {}
