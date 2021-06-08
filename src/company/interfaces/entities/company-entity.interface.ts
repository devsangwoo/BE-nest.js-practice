import { ICustomer } from 'src/customer/interfaces/entities/customer-entity.interface';

export interface ICompany {
  id: string;
  name: string;
  slug: string;
  telephoneNumber: string;
  customers: ICustomer[];
}
