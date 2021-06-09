import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryRepository } from './country.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './database/country.entity';
import { CountryService } from './country.service';
import { JwtStrategy } from 'src/common/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from 'src/common/auth/guards/global-jwt-auth-and-roles.guard';

@Module({
  imports: [
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
