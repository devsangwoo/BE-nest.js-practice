import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryRepository } from './country.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './database/country.entity';
import { CountryService } from './country.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Country.name,
        schema: CountrySchema,
      },
    ]),
  ],
  providers: [CountryService, CountryResolver, CountryRepository],
  exports: [MongooseModule],
})
export class CountryModule {}
