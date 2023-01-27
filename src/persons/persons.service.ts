import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from 'src/interfaces/persons.interface';
import { PersonResponseDto } from './dto/response-person.dto';
@Injectable()
export class PersonsService {
  constructor(
    @Inject('PERSON_MODEL')
    private personModel: Model<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto): Promise<PersonResponseDto> {
    const creatPerson = new this.personModel(createPersonDto);
    creatPerson.save();
    return new PersonResponseDto(createPersonDto);
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
