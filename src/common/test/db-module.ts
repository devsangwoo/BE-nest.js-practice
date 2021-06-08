import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class MongooseModuleTesting {
  private _instance: DynamicModule;
  private _db: MongoMemoryServer;

  get instance() {
    if (!this._instance) {
      throw new Error('Module not initialized');
    }

    return this._instance;
  }

  async closeConnection() {
    if (!this._instance) {
      throw new Error('Module not initialized');
    }

    await this._db.stop();
  }

  async init() {
    this._db = await MongoMemoryServer.create();

    const dbUri = await this._db.getUri();

    this._instance = MongooseModule.forRoot(dbUri);
  }
}

const mongooseModuleTesting = new MongooseModuleTesting();

export { mongooseModuleTesting };
