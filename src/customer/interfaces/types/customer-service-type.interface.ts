import { BaseServiceType } from 'src/common/data/interfaces/base-service-type.interface';
import { CustomerRepository } from 'src/customer/customer.repository';
import { Customer } from 'src/customer/database/customer.entity';
import { CreateCustomerInput } from 'src/customer/graphql/inputs/create-customer.input';
import { UpdateCustomerInput } from 'src/customer/graphql/inputs/update-customer.input';

export interface ICustomerServiceType extends BaseServiceType {
  entity: Customer;
  entityRepository: CustomerRepository;
  createEntityInput: CreateCustomerInput;
  updateEntityInput: UpdateCustomerInput;
}
