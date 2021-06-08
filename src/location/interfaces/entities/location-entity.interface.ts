import { ICity } from '../../../city/interfaces/entities/city-entity.interface';

export interface ILocation {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  city: ICity;
  zipCode: string;
}
