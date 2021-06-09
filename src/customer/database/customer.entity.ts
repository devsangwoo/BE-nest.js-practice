import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';
import { IBaseEntity } from 'src/common/data/interfaces/base-entity.interface';
import { validateName } from 'src/common/validations/common/name/name.validator';
import { validateIds } from 'src/common/validations/common/ids/ids.validator';
import { ICustomer } from '../interfaces/entities/customer-entity.interface';
import { validateTelephoneNumber } from 'src/common/validations/common/telephone-number/telephone-number.validator';
import { populateMaxDepth } from 'src/common/mongo/config/auto-populate.config';
import { validateId } from 'src/common/validations/common/id/id.validator';
import { validateEmail } from 'src/common/validations/user/email/email.validator';
import { Company } from 'src/company/database/company.entity';
import { ILocation } from 'src/location/interfaces/entities/location-entity.interface';

@Schema()
export class Customer extends Document implements IBaseEntity, ICustomer {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateName })
  name: string;

  @Prop({ required: true, validate: validateName })
  lastName: string;

  @Prop({ required: true, validate: validateEmail })
  email: string;

  @Prop({ required: true, validate: validateTelephoneNumber })
  telephoneNumber: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Company',
    validate: validateId,
    autopopulate: { maxDepth: populateMaxDepth },
  })
  company: Company;

  @Prop({
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Location',
    validate: validateIds,
    autopopulate: { maxDepth: populateMaxDepth },
  })
  locations: ILocation[];

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.plugin(MongooseAutoPopulate);

CustomerSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
