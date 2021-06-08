import { IErrorMessageBuilderProps } from './error-message-builder.interface';

export interface IDatabaseValidator {
  validator: (value: any) => boolean;
  message: (value: IErrorMessageBuilderProps) => string;
}
