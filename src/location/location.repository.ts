import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { Repository } from 'src/common/data/classes/repository.class';
import { EntryNotFoundException } from 'src/common/errors/errors';
import {
  createEntityLog,
  deleteEntityLog,
} from 'src/common/functions/log-message-builder';
import { Customer } from 'src/customer/database/customer.entity';
import { Location } from './database/location.entity';
import { CreateLocationInput } from './graphql/inputs/create-location.input';
import { ILocationRepositoryType } from './interfaces/types/location-repository-type.interface';

@Injectable()
export class LocationRepository extends Repository<ILocationRepositoryType> {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    super(locationModel, Location.name);
  }

  public async createEntity(
    createEntityInput: CreateLocationInput,
  ): Promise<Location> {
    this.logger.log(createEntityLog(Location.name, createEntityInput));

    const queryRunner = await this.connection.startSession();
    queryRunner.startTransaction();

    try {
      const { customer } = createEntityInput;

      const location = new this.locationModel({
        ...createEntityInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const customerToUpdate = await this.addLocationToCustomer(
        customer,
        location._id,
      );

      await customerToUpdate.save();
      const result = await location.save();

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

  public async deleteEntity(
    deleteEntityInput: GetEntityByIdInput,
  ): Promise<Location> {
    this.logger.log(deleteEntityLog(Customer.name, deleteEntityInput));

    const queryRunner = await this.connection.startSession();
    queryRunner.startTransaction();

    try {
      const location = await this.locationModel.findOne(deleteEntityInput);

      if (!location) {
        throw new EntryNotFoundException();
      }

      location.deleted = true;
      location.updatedAt = new Date().toISOString();

      const customerToUpdate = await this.removeLocationFromCustomer(
        location.customer.id,
        location._id,
      );

      await customerToUpdate.save();
      const result = await location.save();

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

  private async removeLocationFromCustomer(customerID, location) {
    const customer = await this.customerModel.findOne({
      id: customerID,
    });

    if (!customer) {
      throw new NotFoundException();
    }

    customer.locations = customer.locations.filter(
      (value) => value.id === location,
    );

    return customer;
  }

  private async addLocationToCustomer(customerID, location) {
    const customer = await this.customerModel.findOne({
      id: customerID,
    });

    if (!customer) {
      throw new NotFoundException();
    }

    customer.locations.push(location);

    return customer;
  }
}
