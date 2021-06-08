import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository, CustomerRepository } from './customer.repository';
import { CompanyService, CustomerService } from './customer.service';
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
  providers: [CustomerService, customerre, CustomerRepository],
  exports: [MongooseModule],
})
export class CustomerModule {}
