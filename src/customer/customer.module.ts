import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository } from './customer.repository';
import { CompanyService } from './customer.service';
import { Company, CompanySchema } from './database/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
      },
    ]),
  ],
  providers: [CompanyService, CompanyRepository, Company],
  exports: [MongooseModule],
})
export class CustomerModule {}
