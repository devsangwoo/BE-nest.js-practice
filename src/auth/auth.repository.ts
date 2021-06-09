import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from '../user/database/user.entity';
import { CredentialService } from '../credential/credential.service';
import { SignUpUserInput } from './graphql/input/sign-up-user.input';
import { InvalidFunctionInputError } from 'src/common/errors/errors';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly credentialService: CredentialService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async localSignUpUser(
    signUpUserInput: SignUpUserInput,
  ): Promise<User> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { email, password, authType, socialProvider } = signUpUserInput;

      if (!authType || !socialProvider) {
        throw new InvalidFunctionInputError();
      }

      await this.credentialService.createCredential(
        { email, password },
        session,
      );

      delete signUpUserInput.password;

      const user = new this.userModel({
        ...signUpUserInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await user.save({ session });
      await session.commitTransaction();

      return user;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
