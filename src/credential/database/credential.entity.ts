import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ICredential } from '../interfaces/entities/credential-entity.interface';
import * as bcrypt from 'bcryptjs';
import { IBaseEntity } from '../../common/data/interfaces/base-entity.interface';
import { validatePassword } from 'src/common/validations/user/password/password.validator';
import { validateEmail } from 'src/common/validations/user/email/email.validator';

@Schema()
export class Credential extends Document implements IBaseEntity, ICredential {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true, validate: validateEmail })
  email: string;

  @Prop({ required: true, validate: validatePassword })
  password: string;

  @Prop({ required: true, default: false })
  confirmed: boolean;

  @Prop({ required: true, default: false })
  blocked: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

CredentialSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});

CredentialSchema.pre<ICredential & Document>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});
