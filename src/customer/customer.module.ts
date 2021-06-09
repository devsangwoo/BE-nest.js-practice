import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { CustomerRepository } from './customer.repository';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { Customer, CustomerSchema } from './database/customer.entity';

@Module({
  imports: [
    forwardRef(() => CompanyModule),
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  providers: [CustomerService, CustomerResolver, CustomerRepository],
  exports: [MongooseModule],
})
export class CustomerModule {}
