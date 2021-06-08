import { ICountry } from 'src/country/interfaces/entities/country-entity.interface';

export interface ILocation {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  country: ICountry;
  zipCode: string;
}
