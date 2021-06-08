import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/data/classes/service.class';
import { CustomerRepository } from './customer.repository';
import { ICustomerServiceType } from './interfaces/types/customer-service-type.interface';

@Injectable()
export class CustomerService extends Service<ICustomerServiceType> {
  constructor(private readonly customerRepository: CustomerRepository) {
    super(customerRepository);
  }
}
