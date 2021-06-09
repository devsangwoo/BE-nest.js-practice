import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { Repository } from 'src/common/data/classes/repository.class';
import { EntryNotFoundException } from 'src/common/errors/errors';
import { deleteEntityLog } from 'src/common/functions/log-message-builder';
import { Customer } from 'src/customer/database/customer.entity';
import { Company } from './database/company.entity';
import { ICompanyRepositoryType } from './interfaces/types/company-repository-type.interface';

@Injectable()
export class CompanyRepository extends Repository<ICompanyRepositoryType> {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
  ) {
    super(companyModel, Company.name);
  }

  public async deleteEntity(
    deleteCompanyInput: GetEntityByIdInput,
  ): Promise<Company> {
    try {
      this.logger.log(deleteEntityLog(Company.name, deleteCompanyInput));

      const deleteObj = {
        deleted: true,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.companyModel
        .findOneAndUpdate(deleteCompanyInput, deleteObj, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      await this.customerModel.updateMany(
        { _id: { $in: result.customers } },
        deleteObj,
      );

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
