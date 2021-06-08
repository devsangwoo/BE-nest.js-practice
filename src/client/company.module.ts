import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { Company, CompanySchema } from './database/company.entity';

@Module({
  imports: [
    forwardRef(() => ModelModule),
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
export class CompanyModule {}
