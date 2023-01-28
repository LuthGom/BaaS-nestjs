import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonResponseDto } from './dto/response-person.dto';
import { Person } from 'src/interfaces/persons.interface';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(
    @Body() createPersonDto: CreatePersonDto,
  ): JSON
   | Promise<PersonResponseDto> {
    if (
      !this.personsService.findByCpf(createPersonDto.cpf) &&
      !this.personsService.findByEmail(createPersonDto.email)
    ) {
      return this.personsService.create(createPersonDto);
    } else {
      return JSON.parse("message: 'The e-mail or cpf it's already registered. Please verify your data!'");
    }
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonResponseDto> {
    return this.personsService.update(id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.personsService.remove(id);
  }
}
