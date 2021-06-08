import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalJwtAuthAndRolesGuard } from 'src/common/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from 'src/common/auth/strategies/jwt.strategy';
import { ModelModule } from 'src/model/model.module';
import { BrandRepository } from './company.repository';
import { BrandResolver } from './company.resolver';
import { BrandService } from './company.service';
import { Brand, BrandSchema } from './database/company.entity';

@Module({
  imports: [
    forwardRef(() => ModelModule),
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  providers: [
    BrandService,
    BrandRepository,
    BrandResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [MongooseModule],
})
export class BrandModule {}
