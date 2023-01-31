import { Model, Document } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from 'src/interfaces/persons.interface';
import { PersonResponseDto } from './dto/response-person.dto';
import { geradorDeContas } from 'src/services/geradorDeContas';
@Injectable()
export class PersonsService {
  constructor(
    @Inject('PERSON_MODEL')
    private personModel: Model<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonResponseDto> {
    const creatPerson = new this.personModel(createPersonDto);
    if (this.findByAccount(createPersonDto.account)) {
      createPersonDto.account = geradorDeContas();
    }
    await creatPerson.save();
    return new PersonResponseDto(createPersonDto);
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }

  async findByCpf(
    cpf: string,
  ): Promise<
    (Document<unknown, any, Person> &
      Person & { _id: import('mongoose').Types.ObjectId })[]
  > {
    return await this.personModel.find().where('cpf').equals(cpf);
  }

  async findOne(email: string) {
    const person = await this.personModel
      .find()
      .where('email')
      .equals(email)
      .exec();
    return person;
  }

  async findByAccount(accountNumber: number): Promise<object> {
    const person = await this.personModel
      .find()
      .where('account')
      .equals(accountNumber);
    const { name, cpf, account, vd, saldo } = person[0];
    const personSaldo = { name, cpf, account, vd, saldo };
    return personSaldo;
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonResponseDto> {
    return this.personModel.findByIdAndUpdate(
      { _id: id },
      { $set: new PersonResponseDto(updatePersonDto) },
      { new: true },
    );
  }

  async remove(id: string): Promise<any> {
    return this.personModel.findByIdAndDelete({ _id: id });
  }
}
