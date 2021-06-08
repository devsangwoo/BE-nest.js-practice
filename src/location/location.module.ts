import { Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { LocationResolver } from './location.resolver';
import { LoggerModule } from '@common/common/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './database/location.entity';
import { LocationService } from './location.service';
import { JwtStrategy } from '@common/common/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@common/common/auth/guards/global-jwt-auth-and-roles.guard';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
    ]),
  ],
  providers: [
    LocationService,
    LocationRepository,
    LocationResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [MongooseModule],
})
export class LocationModule {}
