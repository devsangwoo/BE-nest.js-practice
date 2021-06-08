import { registerEnumType } from '@nestjs/graphql';

export enum DealerType {
  Dealer = 'dealer',
  CurboSpot = 'curbo-spot',
}

registerEnumType(DealerType, {
  name: 'DealerType',
});
