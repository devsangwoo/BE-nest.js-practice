import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/database/user.entity';
import { CreateUserInput } from 'src/user/graphql/inputs/create-user.input';
import { UpdateUserInput } from 'src/user/graphql/inputs/update-user.input';
import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';

export interface IUserServiceType extends BaseServiceType {
  entity: User;
  entityRepository: UserRepository;
  createEntityInput: CreateUserInput;
  updateEntityInput: UpdateUserInput;
}
