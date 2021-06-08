import { ICompany } from 'src/company/interfaces/entities/company-entity.interface';

export interface ICustomer {
  id: string;
  name: string;
  lastName: string;
  telephoneNumber: string;
  email: string;
  company: ICompany;
  directions: string[];
}
