import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { IUserServiceType } from './interfaces/user-service-type.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends Service<IUserServiceType> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
