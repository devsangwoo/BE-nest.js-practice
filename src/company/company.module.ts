import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from 'src/customer/customer.module';
import { CompanyRepository } from './company.repository';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { Company, CompanySchema } from './database/company.entity';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
      },
    ]),
  ],
  providers: [CompanyService, CompanyRepository, CompanyResolver],
  exports: [MongooseModule],
})
export class CompanyModule {}
