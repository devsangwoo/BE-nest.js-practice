import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/database/user.entity';
import { CredentialService } from 'src/credential/credential.service';
import * as bcrypt from 'bcryptjs';
import { AuthenticationType } from './graphql/types/authentication.type';
import { TokensService } from './tokens.service';
import { UpdatePasswordInput } from './graphql/input/update-password.input';

@Injectable()
export class AuthService {
  constructor(
    private credentialService: CredentialService,
    private tokensService: TokensService,
  ) {}

  private readonly logger = new Logger();

  async validateCredential(email: string, password: string) {
    try {
      const credential = await this.credentialService.getCredentialByIdOrEmail({
        email,
      });

      return await bcrypt.compare(password, credential.password);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      return false;
    }
  }

  async signInUser(user: User): Promise<AuthenticationType> {
    const accessToken = await this.tokensService.signAccessToken(user);

    return { accessToken, user };
  }

  public async updatePassword(
    updatePasswordInput: UpdatePasswordInput,
  ): Promise<boolean> {
    try {
      const { data, where } = updatePasswordInput;
      const { newPassword, oldPassword } = data;
      const { email } = where;

      const valid = await this.validateCredential(email, oldPassword);

      if (valid) {
        await this.credentialService.resetPassword({
          where: { email },
          data: { password: newPassword },
        });
      } else {
        throw new UnauthorizedException();
      }

      return true;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
