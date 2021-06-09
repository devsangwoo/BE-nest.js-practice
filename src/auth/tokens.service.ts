import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../user/database/user.entity';
import { JwtPayload } from 'src/common/auth/interfaces/jwt-payload.interface';

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService) {}

  async signAccessToken(user: User) {
    const { id, email, role } = user;

    const payload: JwtPayload = { id, email, role };

    const signOptions: JwtSignOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      secret: process.env.ACCESS_TOKEN_SECRET,
    };
    const accessToken = await this.jwtService.signAsync(payload, signOptions);

    return accessToken;
  }
}
