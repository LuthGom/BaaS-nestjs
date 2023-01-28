import { Model } from 'mongoose';
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
    createPersonDto.account = geradorDeContas();
    creatPerson.save();
    return new PersonResponseDto(createPersonDto);
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }

  async findOne(id: string): Promise<Person> {
    return this.personModel.findById({ _id: id }).exec();
  }

  async findByCpf(
    cpf: string,
  ): Promise<
    (import('mongoose').Document<unknown, any, Person> &
      Person & { _id: import('mongoose').Types.ObjectId })[]
  > {
    return await this.personModel.find().where('cpf').equals(cpf);
  }

  async findByEmail(
    email: string,
  ): Promise<
    (import('mongoose').Document<unknown, any, Person> &
      Person & { _id: import('mongoose').Types.ObjectId })[]
  > {
    return await this.personModel.find().where('email').equals(email);
  }

  async findByAccount(
    account: string,
  ): Promise<
    (import('mongoose').Document<unknown, any, Person> &
      Person & { _id: import('mongoose').Types.ObjectId })[]
  > {
    return await this.personModel.find().where('account').equals(account);
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
