import { Test } from '@nestjs/testing';
import { TokensService } from '../tokens.service';
import { AuthService } from '../auth.service';
import { CredentialService } from 'src/credential/credential.service';
import { mongooseModuleTesting } from 'src/common/test/db-module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/user/database/user.entity';
import { EntryNotFoundException } from 'src/common/errors/errors';
import { AuthRepository } from '../auth.repository';

describe(`Auth Service`, () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let user: User;

  const tokensService = {
    signAccessToken: jest.fn(),
    createAndSignRefreshToken: jest.fn(),
  };

  const credentialService = {
    getCredentialByIdOrEmail: jest.fn(),
  };

  const authRepository = {
    localSignUpUser: jest.fn(),
  };

  const createUser = async () => {
    const entity = new userModel({
      email: 'john@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await entity.save();
  };

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        mongooseModuleTesting.instance,
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [
        {
          provide: TokensService,
          useValue: tokensService,
        },
        {
          provide: CredentialService,
          useValue: credentialService,
        },
        {
          provide: AuthRepository,
          useValue: authRepository,
        },
        AuthService,
      ],
    }).compile();

    authService = testModule.get<AuthService>(AuthService);
    userModel = testModule.get<Model<User>>(getModelToken(User.name));

    user = await createUser();
  });

  describe(`validateCredential`, () => {
    it(`should call the getCredentialByIdOrEmail of the credentialService`, async () => {
      const email = 'test@email.com';
      const password = 'password';

      credentialService.getCredentialByIdOrEmail.mockReturnValueOnce({
        password: 'password',
      });

      await authService.validateCredential(email, password);

      expect(credentialService.getCredentialByIdOrEmail).toHaveBeenCalled();
      expect(credentialService.getCredentialByIdOrEmail).toHaveBeenCalledWith({
        email,
      });
    });

    it(`should return false if any exception is thrown`, async () => {
      const email = 'test@email.com';
      const password = 'password';

      credentialService.getCredentialByIdOrEmail.mockImplementation(() => {
        throw new EntryNotFoundException();
      });

      const result = await authService.validateCredential(email, password);

      expect(result).toBe(false);
    });
  });

  describe(`signInUser`, () => {
    it(`should call the signAccessToken and createAndSignRefreshToken method of the tokensService`, async () => {
      await authService.signInUser(user);

      expect(tokensService.signAccessToken).toHaveBeenCalled();
      expect(tokensService.signAccessToken).toHaveBeenLastCalledWith(user);
    });
  });
});
