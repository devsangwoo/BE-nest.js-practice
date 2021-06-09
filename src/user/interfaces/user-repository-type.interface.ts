import { Model } from 'mongoose';
import { User } from 'src/user/database/user.entity';
import { CreateUserInput } from 'src/user/graphql/inputs/create-user.input';
import { UpdateUserInput } from 'src/user/graphql/inputs/update-user.input';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';

export interface IUserRepositoryType extends BaseRepositoryType {
  entity: User;
  entityModel: Model<User>;
  createEntityInput: CreateUserInput;
  updateEntityInput: UpdateUserInput;
}
