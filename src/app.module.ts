import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';
import { CustomerModule } from './customer/customer.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.moss-green.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    CompanyModule,
    CustomerModule,
    LocationModule,
    CountryModule,
  ],
})
export class AppModule {}
