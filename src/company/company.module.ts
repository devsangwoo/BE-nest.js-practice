import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalJwtAuthAndRolesGuard } from 'src/common/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from 'src/common/auth/strategies/jwt.strategy';
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
  providers: [
    CompanyService,
    CompanyRepository,
    CompanyResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [MongooseModule],
})
export class CompanyModule {}
