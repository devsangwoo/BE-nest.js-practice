import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GlobalJwtAuthAndRolesGuard } from 'src/common/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from 'src/common/auth/strategies/jwt.strategy';
import { CredentialModule } from 'src/credential/credential.module';
import { UserModule } from 'src/user/user.module';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CredentialModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    TokensService,
    LocalStrategy,
    AuthRepository,
    JwtStrategy,
    AuthResolver,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
