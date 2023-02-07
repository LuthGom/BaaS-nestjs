import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';
import { Person } from 'src/interfaces/persons.interface';
@Injectable()
export class AccountsService {
  constructor(
    @Inject('PERSON_MODEL')
    private personModel: Model<Person>,
  ) {}

  async findAll() {
    return await this.personModel.find();
  }

  async findbyId(id: string) {
    const account = await this.personModel.findById({_id: id});
   
    
    return account;
  }
  async findByCpf(cpf: string) {
    const account = await this.personModel.find().where('cpf').equals(cpf);
    return account;
  }

  async findByAccount(account: number) {
    const accountReturned = await this.personModel
      .find()
      .where('account')
      .equals(account);
    return accountReturned;
  }
}
