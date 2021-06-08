import { Model } from 'mongoose';
import { BaseRepositoryType } from 'src/common/data/interfaces/base-repository-type.interface';
import { Customer } from 'src/customer/database/customer.entity';
import { CreateCustomerInput } from 'src/customer/graphql/inputs/create-customer.input';
import { UpdateCustomerInput } from 'src/customer/graphql/inputs/update-customer.input';
export interface ICustomerRepositoryType extends BaseRepositoryType {
  entity: Customer;
  entityModel: Model<Customer>;
  createEntityInput: CreateCustomerInput;
  updateEntityInput: UpdateCustomerInput;
}
