import { ICompany } from 'src/company/interfaces/entities/company-entity.interface';
import { ILocation } from 'src/location/interfaces/entities/location-entity.interface';

export interface ICustomer {
  id: string;
  name: string;
  lastName: string;
  telephoneNumber: string;
  email: string;
  company: ICompany;
  locations: ILocation[];
}
