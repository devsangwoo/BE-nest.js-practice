import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Repository } from 'src/common/data/classes/repository.class';
import { EntryNotFoundException } from 'src/common/errors/errors';
import {
  createEntityLog,
  updateEntityLog,
} from 'src/common/functions/log-message-builder';
import { updateEntities } from 'src/common/functions/update-entities';
import { CredentialService } from 'src/credential/credential.service';
import { User } from './database/user.entity';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { IUserRepositoryType } from './interfaces/user-repository-type.interface';

@Injectable()
export class UserRepository extends Repository<IUserRepositoryType> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly credentialService: CredentialService,
  ) {
    super(userModel, User.name);
  }

  public async createEntity(createUserInput: CreateUserInput): Promise<User> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { email, password } = createUserInput;

      this.logger.log(createEntityLog(User.name, createUserInput));

      await this.credentialService.createCredential(
        { email, password },
        session,
      );

      delete createUserInput.password;

      const user = new this.userModel({
        ...createUserInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await user.save({ session });
      await session.commitTransaction();

      return user;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async updateEntity(updateUserInput: UpdateUserInput): Promise<User> {
    this.logger.log(updateEntityLog(User.name, updateUserInput));

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { data, where } = updateUserInput;
      const updateEntity = updateEntities(data);
      const { password } = updateEntity;

      const user = await this.userModel.findOne(where);

      if (!user) {
        throw new EntryNotFoundException();
      }

      if (password) {
        await this.credentialService.resetPassword(
          {
            where: { email: user.email },
            data: { password },
          },
          session,
        );

        delete updateEntity.password;
      }

      user.set(updateEntity);

      await user.save({ session });
      await session.commitTransaction();

      return user;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
