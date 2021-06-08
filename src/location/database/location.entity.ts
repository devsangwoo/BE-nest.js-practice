import { Document, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from '@common/common/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';
import { populateMaxDepthFour } from '@common/common/mongo/config/auto-populate.config';
import { ILocation } from '../interfaces/entities/location-entity.interface';
import { validateLatitude } from '@common/common/validations/location/latitude/latitude.validator';
import { validateLongitude } from '@common/common/validations/location/longitude/longitude.validator';
import { validateAddress } from '@common/common/validations/common/address/address.validator';
import { validateId } from '@common/common/validations/common/id/id.validator';
import { validateZipCode } from '@common/common/validations/location/zip-code/zip-code.validator';
import { City } from '../../city/database/city.entity';

@Schema()
export class Location extends Document implements IBaseEntity, ILocation {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateLatitude })
  latitude: number;

  @Prop({ required: true, validate: validateLongitude })
  longitude: number;

  @Prop({ required: true, validate: validateAddress })
  address: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'City',
    validate: validateId,
    autopopulate: { maxDepth: populateMaxDepthFour },
  })
  city: City;

  @Prop({ required: true, validate: validateZipCode })
  zipCode: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

LocationSchema.plugin(MongooseAutoPopulate);

LocationSchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
