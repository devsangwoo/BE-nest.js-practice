import { Document, Schema as MongooseSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';
import { ILocation } from '../interfaces/entities/location-entity.interface';
import { IBaseEntity } from 'src/common/data/interfaces/base-entity.interface';
import { validateLatitude } from 'src/common/validations/location/latitude/latitude.validator';
import { validateLongitude } from 'src/common/validations/location/longitude/longitude.validator';
import { validateAddress } from 'src/common/validations/common/address/address.validator';
import { validateId } from 'src/common/validations/common/id/id.validator';
import { Country } from 'src/country/database/country.entity';
import { populateMaxDepth } from 'src/common/mongo/config/auto-populate.config';
import { validateZipCode } from 'src/common/validations/location/zip-code/zip-code.validator';

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
    ref: 'Country',
    validate: validateId,
    autopopulate: { maxDepth: populateMaxDepth },
  })
  country: Country;

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

LocationSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
