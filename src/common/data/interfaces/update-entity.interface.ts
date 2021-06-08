import { IGetEntityById } from './get-entity-by-id.interface';

export interface IUpdateEntity {
  where: IGetEntityById;
  data: Record<any, any>;
}
