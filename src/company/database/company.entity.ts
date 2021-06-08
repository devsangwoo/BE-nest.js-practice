import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';
import { IBaseEntity } from 'src/common/data/interfaces/base-entity.interface';
import { validateName } from 'src/common/validations/common/name/name.validator';
import { validateSlug } from 'src/common/validations/common/slug/slug.validator';
import { validateIds } from 'src/common/validations/common/ids/ids.validator';
import { ICompany } from '../interfaces/entities/company-entity.interface';
import { validateTelephoneNumber } from 'src/common/validations/common/telephone-number/telephone-number.validator';

@Schema()
export class Company extends Document implements IBaseEntity, ICompany {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateName })
  name: string;

  @Prop({ required: true, unique: true, validate: validateSlug })
  slug: string;

  @Prop({ required: true, validate: validateTelephoneNumber })
  telephoneNumber: string;

  @Prop({
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Client',
    validate: validateIds,
    autopopulate: { maxDepth: pop },
  })
  clients: string[];

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.plugin(MongooseAutoPopulate);

CompanySchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
