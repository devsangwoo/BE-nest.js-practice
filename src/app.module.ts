import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';
import { CredentialModule } from './credential/credential.module';
import { CustomerModule } from './customer/customer.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';

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
    UserModule,
    CredentialModule,
    AuthModule,
  ],
})
export class AppModule {}
