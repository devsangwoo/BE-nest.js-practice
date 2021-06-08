import { forwardRef, Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryRepository } from './country.repository';
import { LoggerModule } from '@common/common/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './database/country.entity';
import { CountryService } from './country.service';
import { CityModule } from '../city/city.module';
import { StateModule } from '../state/state.module';
import { JwtStrategy } from '@common/common/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@common/common/auth/guards/global-jwt-auth-and-roles.guard';

@Module({
  imports: [
    LoggerModule,
    forwardRef(() => StateModule),
    CityModule,
    MongooseModule.forFeature([
      {
        name: Country.name,
        schema: CountrySchema,
      },
    ]),
  ],
  providers: [
    CountryService,
    CountryResolver,
    CountryRepository,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [MongooseModule],
})
export class CountryModule {}
