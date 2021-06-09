import {
  JwtModule,
  JwtService,
  JwtSignOptions,
  JwtVerifyOptions,
} from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserSchema } from 'src/user/database/user.entity';
import { TokensService } from '../tokens.service';
import { Model, Types, Document } from 'mongoose';
import { mongooseModuleTesting } from 'src/common/test/db-module';
import { RefreshTokenPayload } from 'src/common/auth/interfaces/refresh-token-payload.interface';
import {
  ExpiredRefreshTokenException,
  MalformedRefreshTokenException,
  RevokedRefreshTokenException,
} from 'src/common/errors/errors';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { UserService } from 'src/user/user.service';

describe('Tokens Service', () => {
  let userModel: Model<User>;

  let tokensService: TokensService;
  let jwtService: JwtService;

  let user: Document;

  let verifyAccessTokenOptions: JwtVerifyOptions;
  let verifyRefreshTokenOptions: JwtVerifyOptions;

  const refreshTokenId = Types.ObjectId().toHexString();

  const refreshTokenService = {
    getRefreshTokenById: jest.fn(),
    createRefreshToken: jest.fn(),
    revokeRefreshToken: jest.fn(),
  };

  const userService = {
    getEntityById: jest.fn(),
  };

  const createUser = async () => {
    const entity = new userModel({
      name: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await entity.save();
  };

  beforeAll(async () => {
    process.env.ACCESS_TOKEN_SECRET = 'secret1';
    process.env.REFRESH_TOKEN_SECRET = 'secret2';

    process.env.REFRESH_TOKEN_EXPIRES_IN = '60s';
    process.env.ACCESS_TOKEN_EXPIRES_IN = '30s';

    verifyAccessTokenOptions = {
      secret: process.env.ACCESS_TOKEN_SECRET,
    };

    verifyRefreshTokenOptions = {
      secret: process.env.REFRESH_TOKEN_SECRET,
    };

    const testModule = await Test.createTestingModule({
      imports: [
        mongooseModuleTesting.instance,
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
        JwtModule.register({}),
      ],
      providers: [
        {
          provide: RefreshTokenService,
          useValue: refreshTokenService,
        },
        {
          provide: UserService,
          useValue: userService,
        },
        TokensService,
      ],
    }).compile();

    tokensService = testModule.get<TokensService>(TokensService);
    jwtService = testModule.get<JwtService>(JwtService);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));

    user = await createUser();
  });

  describe(`signAccessToken`, () => {
    it(`should return a valid jwt containing the provided user information as payload`, async () => {
      const accessToken = await tokensService.signAccessToken(user);

      const accessTokenPayload = await jwtService.verifyAsync(
        accessToken,
        verifyAccessTokenOptions,
      );

      delete accessTokenPayload.exp;
      delete accessTokenPayload.iat;

      expect(user.toObject()).toMatchObject(accessTokenPayload);
    });
  });

  describe(`createAndSignRefreshToken`, () => {
    it(`should call the createRefreshToken method refreshTokenService`, async () => {
      refreshTokenService.createRefreshToken.mockImplementation(input => ({
        id: refreshTokenId,
        user: input.user,
      }));

      await tokensService.createAndSignRefreshToken(user);

      expect(refreshTokenService.createRefreshToken).toHaveBeenCalled();
      expect(refreshTokenService.createRefreshToken).toHaveBeenCalledWith({
        user: user.id,
      });
    });

    it(`should return a valid jwt containing expiration time, user id and refresh token id as payload`, async () => {
      refreshTokenService.createRefreshToken.mockImplementation(input => ({
        id: refreshTokenId,
        user: input.user,
      }));

      const refreshToken = await tokensService.createAndSignRefreshToken(user);

      const refreshTokenPayload = await jwtService.verifyAsync(
        refreshToken,
        verifyRefreshTokenOptions,
      );

      expect(refreshTokenPayload).toHaveProperty('exp');

      expect(user.id).toBe(refreshTokenPayload.user);
      expect(refreshTokenId).toBe(refreshTokenPayload.jti);
    });
  });

  describe(`refreshAccessToken`, () => {
    it(`should throw an ExpiredRefreshTokenException if the provided refresh token is expired`, async () => {
      const payload: RefreshTokenPayload = { user: user.id };

      const signOptions: JwtSignOptions = {
        jwtid: Types.ObjectId().toHexString(),
        expiresIn: '0s',
        secret: process.env.REFRESH_TOKEN_SECRET,
      };

      const refreshToken = await jwtService.signAsync(payload, signOptions);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(ExpiredRefreshTokenException);
    });

    it(`should throw an MalformedRefreshTokenException if the provided refresh token is missing jwtid field in payload`, async () => {
      const payload: RefreshTokenPayload = { user: user.id };

      const signOptions: JwtSignOptions = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        secret: process.env.REFRESH_TOKEN_SECRET,
      };

      const refreshToken = await jwtService.signAsync(payload, signOptions);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(MalformedRefreshTokenException);
    });

    it(`should throw an MalformedRefreshTokenException if the provided refresh token is missing user field in payload`, async () => {
      refreshTokenService.getRefreshTokenById.mockReturnValueOnce({
        id: refreshTokenId,
        isRevoked: false,
      });

      const payload = {};

      const signOptions: JwtSignOptions = {
        jwtid: refreshTokenId,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        secret: process.env.REFRESH_TOKEN_SECRET,
      };

      const refreshToken = await jwtService.signAsync(payload, signOptions);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(MalformedRefreshTokenException);
    });

    it(`should throw an RevokedRefreshTokenException if the provided refresh token is revoked`, async () => {
      refreshTokenService.getRefreshTokenById.mockReturnValueOnce({
        id: refreshTokenId,
        isRevoked: true,
      });

      const payload = { user: user.id };

      const signOptions: JwtSignOptions = {
        jwtid: refreshTokenId,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        secret: process.env.REFRESH_TOKEN_SECRET,
      };

      const refreshToken = await jwtService.signAsync(payload, signOptions);

      const result = tokensService.refreshAccessToken({ refreshToken });

      await expect(result).rejects.toThrow(RevokedRefreshTokenException);
    });

    it(`should return a new access and refresh token, and the related user, if a valid refresh token is provided`, async () => {
      refreshTokenService.getRefreshTokenById.mockReturnValueOnce({
        id: refreshTokenId,
        isRevoked: false,
      });

      userService.getEntityById.mockReturnValueOnce({ id: user.id });

      const payload = { user: user.id };

      const signOptions: JwtSignOptions = {
        jwtid: refreshTokenId,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        secret: process.env.REFRESH_TOKEN_SECRET,
      };

      const refreshToken = await jwtService.signAsync(payload, signOptions);

      const result = await tokensService.refreshAccessToken({ refreshToken });

      const accessTokenPayload = await jwtService.verifyAsync(
        result.accessToken,
        verifyAccessTokenOptions,
      );

      const refreshTokenPayload = await jwtService.verifyAsync(
        result.refreshToken,
        verifyRefreshTokenOptions,
      );

      expect(result.user.id).toEqual(user.toObject().id);

      expect(accessTokenPayload).not.toBeNull();
      expect(refreshTokenPayload).not.toBeNull();
    });
  });
});
