import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository } from './customer.repository';
import { CompanyService } from './customer.service';
import { Customer, CustomerSchema } from './database/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  providers: [CompanyService, CompanyRepository, CompanyRes],
  exports: [MongooseModule],
})
export class CustomerModule {}
