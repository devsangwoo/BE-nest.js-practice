import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/database/user.entity';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const isValidCredential = await this.authService.validateCredential(
      email,
      password,
    );

    if (isValidCredential) {
      const users = await this.userService.getAllEntities({ where: { email } });
      const user = <User>users[0];

      return user;
    }

    throw new UnauthorizedException();
  }
}
