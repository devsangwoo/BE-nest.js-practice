import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from '../user/database/user.entity';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtPayload } from 'src/common/auth/interfaces/jwt-payload.interface';
import { RefreshTokenPayload } from 'src/common/auth/interfaces/refresh-token-payload.interface';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshToken } from 'src/refresh-token/database/refresh-token.entity';
import { UserService } from 'src/user/user.service';
import { AuthenticationType } from './graphql/types/authentication.type';
import {
  ExpiredRefreshTokenException,
  MalformedRefreshTokenException,
  RevokedRefreshTokenException,
} from 'src/common/errors/errors';
import { RefreshAccessTokenInput } from './graphql/input/refresh-access-token.input';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private userService: UserService,
  ) {}

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

  async createAndSignRefreshToken(user: User) {
    const refreshToken = await this.refreshTokenService.createRefreshToken({
      user: user.id,
    });

    const payload: RefreshTokenPayload = { user: refreshToken.user };

    const signOptions: JwtSignOptions = {
      jwtid: refreshToken.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      secret: process.env.REFRESH_TOKEN_SECRET,
    };

    const jwt = await this.jwtService.signAsync(payload, signOptions);

    return jwt;
  }

  async refreshAccessToken(
    refreshAccessTokenInput: RefreshAccessTokenInput,
  ): Promise<AuthenticationType> {
    const { user } = await this.resolveRefreshToken(
      refreshAccessTokenInput.refreshToken,
    );

    const refreshToken = await this.createAndSignRefreshToken(user);
    const accessToken = await this.signAccessToken(user);

    return { user, accessToken, refreshToken };
  }

  private async resolveRefreshToken(
    encodedRefreshToken: string,
  ): Promise<{ user: User; refreshToken: RefreshToken }> {
    const payload = await this.decodeAndVerifyRefreshToken(encodedRefreshToken);
    const refreshToken = await this.getRefreshTokenFromPayload(payload);

    if (refreshToken.isRevoked) {
      throw new RevokedRefreshTokenException();
    }

    const user = await this.validateUserFromPayload(payload);

    return { user, refreshToken };
  }

  private async decodeAndVerifyRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenPayload> {
    try {
      const verifyOptions: JwtVerifyOptions = {
        secret: process.env.REFRESH_TOKEN_SECRET,
      };

      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        verifyOptions,
      );

      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredRefreshTokenException();
      } else {
        throw new MalformedRefreshTokenException();
      }
    }
  }

  private async getRefreshTokenFromPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken> {
    const refreshTokenId = payload.jti;

    if (!refreshTokenId) {
      throw new MalformedRefreshTokenException();
    }

    return this.refreshTokenService.getRefreshTokenById({ id: refreshTokenId });
  }

  private async validateUserFromPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const userId = payload.user;

    if (!userId) {
      throw new MalformedRefreshTokenException();
    }

    const user = await this.userService.getEntityById({ id: userId });

    return user;
  }
}
