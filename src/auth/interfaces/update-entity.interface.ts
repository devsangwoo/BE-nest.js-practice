import { IGetEntityByEmail } from 'src/auth/interfaces/get-entity-by-email.interface';

export interface IUpdateEntityCustom {
  where: IGetEntityByEmail;
  data: Record<any, any>;
}
