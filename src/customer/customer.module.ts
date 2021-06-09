import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalJwtAuthAndRolesGuard } from 'src/common/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from 'src/common/auth/strategies/jwt.strategy';
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
  providers: [
    CustomerService,
    CustomerResolver,
    CustomerRepository,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [MongooseModule],
})
export class CustomerModule {}
