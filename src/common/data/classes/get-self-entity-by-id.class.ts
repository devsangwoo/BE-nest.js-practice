import { IGetEntityById } from '../interfaces/get-entity-by-id.interface';

export class GetSelfEntityByIdInput implements IGetEntityById {
  id: string;
  user?: string;
}
