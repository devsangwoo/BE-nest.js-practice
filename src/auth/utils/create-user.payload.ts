import { CreatedUserPayload } from '@common/common/events/user/user.payload';
import { User } from '../../user/database/user.entity';

export const createUserPayload = (
  user: User,
  token?: string,
): CreatedUserPayload => {
  const createdUser: CreatedUserPayload = {
    ...user,
    url: token,
  };

  return createdUser;
};
