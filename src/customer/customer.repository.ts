import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { Repository } from 'src/common/data/classes/repository.class';
import { EntryNotFoundException } from 'src/common/errors/errors';
import {
  createEntityLog,
  deleteEntityLog,
  updateEntityLog,
} from 'src/common/functions/log-message-builder';
import { updateEntities } from 'src/common/functions/update-entities';
import { Company } from 'src/company/database/company.entity';
import { Customer } from './database/customer.entity';
import { CreateCustomerInput } from './graphql/inputs/create-customer.input';
import { UpdateCustomerInput } from './graphql/inputs/update-customer.input';
import { ICustomerRepositoryType } from './interfaces/types/customer-repository-type.interface';

@Injectable()
export class CustomerRepository extends Repository<ICustomerRepositoryType> {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    super(customerModel, Customer.name);
  }

  public async createEntity(
    createEntityInput: CreateCustomerInput,
  ): Promise<Customer> {
    this.logger.log(createEntityLog(Customer.name, createEntityInput));

    const queryRunner = await this.connection.startSession();
    queryRunner.startTransaction();

    try {
      const { company } = createEntityInput;

      const customer = new this.customerModel({
        ...createEntityInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const companyToUpdate = await this.addCustomerToCompany(
        company,
        customer._id,
      );

      await companyToUpdate.save();
      const result = await customer.save();

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.abortTransaction();
      this.logger.error(`${JSON.stringify(error)}`);

      throw error;
    } finally {
      queryRunner.endSession();
    }
  }

  public async updateEntity(
    updateEntityInput: UpdateCustomerInput,
  ): Promise<Customer> {
    this.logger.log(updateEntityLog(Customer.name, updateEntityInput));

    const queryRunner = await this.connection.startSession();
    queryRunner.startTransaction();

    try {
      const { data, where } = updateEntityInput;

      const updateEntity = updateEntities(data);
      const { company } = updateEntity;

      const customer = await this.customerModel.findOne(where);

      if (!customer) {
        throw new EntryNotFoundException();
      }

      if (company && company != customer.company._id) {
        const oldCompany = await this.removeCustomerFromCompany(
          customer.company._id,
          customer._id,
        );

        const newCompany = await this.addCustomerToCompany(
          company,
          customer._id,
        );

        await oldCompany.save();
        await newCompany.save();
      }

      customer.set(updateEntity);
      const result = await customer.save();

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    } finally {
      queryRunner.endSession();
    }
  }

  public async deleteEntity(
    deleteEntityInput: GetEntityByIdInput,
  ): Promise<Customer> {
    this.logger.log(deleteEntityLog(Customer.name, deleteEntityInput));

    const queryRunner = await this.connection.startSession();
    queryRunner.startTransaction();

    try {
      const customer = await this.customerModel.findOne(deleteEntityInput);

      if (!customer) {
        throw new EntryNotFoundException();
      }

      customer.deleted = true;
      customer.updatedAt = new Date().toISOString();

      const companyToUpdate = await this.removeCustomerFromCompany(
        customer.company._id,
        customer._id,
      );

      await companyToUpdate.save();
      const result = await customer.save();

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.abortTransaction();
      this.logger.error(`${JSON.stringify(error)}`);

      throw error;
    } finally {
      queryRunner.endSession();
    }
  }

  private async removeCustomerFromCompany(companyID, customerID) {
    const company = await this.companyModel.findOne({
      id: companyID,
    });

    if (!company) {
      throw new NotFoundException();
    }

    company.customers = company.customers.filter(
      (value) => value._id === customerID,
    );

    return company;
  }

  private async addCustomerToCompany(companyID, customerID) {
    const company = await this.companyModel.findOne({
      id: companyID,
    });

    if (!company) {
      throw new NotFoundException();
    }

    company.customers.push(customerID);

    return company;
  }
}
