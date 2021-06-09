import { JwtModule, JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserSchema } from 'src/user/database/user.entity';
import { TokensService } from '../tokens.service';
import { Model, Document } from 'mongoose';
import { mongooseModuleTesting } from 'src/common/test/db-module';
import { UserService } from 'src/user/user.service';

describe('Tokens Service', () => {
  let userModel: Model<User>;

  let tokensService: TokensService;
  let jwtService: JwtService;

  let user: Document;

  let verifyAccessTokenOptions: JwtVerifyOptions;

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
    process.env.ACCESS_TOKEN_EXPIRES_IN = '30s';

    verifyAccessTokenOptions = {
      secret: process.env.ACCESS_TOKEN_SECRET,
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
});
