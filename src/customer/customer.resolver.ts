import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Customer } from './graphql/types/customer.type';
import { CustomerService } from './customer.service';
import { GraphQlFieldNames } from 'src/common/graphql/enums/graphql-label-types.enum';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from 'src/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from 'src/common/graphql/types/graphql-filter-options';
import { UpdateCustomerInput } from './graphql/inputs/update-customer.input';
import { CreateCustomerInput } from './graphql/inputs/create-customer.input';

@Resolver((_of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((_returns) => Customer)
  public async getCustomerById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Customer> {
    return this.customerService.getEntityById({ id });
  }

  @Query((_returns) => [Customer])
  public async getAllCustomers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Customer[]> {
    return this.customerService.getAllEntities(filterInput);
  }

  @Mutation((_of) => Customer)
  public async createCustomer(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.createEntity(createCustomerInput);
  }

  @Mutation((_of) => Customer)
  public async updateCustomer(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.updateEntity(updateCustomerInput);
  }

  @Mutation((_of) => Customer)
  public async deleteCustomer(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Customer> {
    return this.customerService.deleteEntity({ id });
  }
}
