import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonResponseDto } from './dto/response-person.dto';
import { Person } from 'src/interfaces/persons.interface';
import { UseGuards } from '@nestjs/common/decorators';
import { LocalAuthGuard } from 'src/auth/local-auth';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth';
@Controller('persons')
export class PersonsController {
  constructor(
    private readonly personsService: PersonsService,
    private authService: AuthService,
  ) {}

  @Post()
  create(
    @Body() createPersonDto: CreatePersonDto,
  ): string | Promise<PersonResponseDto> {
    return this.personsService.create(createPersonDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('transferencia/:cpf')
  async transferencia(@Param('cpf') cpf: string, @Body() transfer: any) {
    const personWhoSents = await this.personsService.findByCpf(cpf);
    const personWhoReceives = await this.personsService.findByCpf(transfer.cpf);
    let { saldo } = personWhoSents[0];
    console.log(saldo, transfer.saldo, personWhoReceives[0].saldo);
    
    if (
      personWhoReceives &&
      Math.sign(transfer.saldo) === 1 &&
      transfer.saldo <= saldo
    ) {
      saldo = saldo - transfer.saldo;
      this.personsService.transferencia(personWhoSents[0].id, { saldo: saldo });
      this.personsService.transferencia(personWhoReceives[0].id, {saldo: transfer.saldo})
      
    } else {
      return new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('saldo/:account')
  async saldo(@Param('account') account: number) {
    return await this.personsService.findByAccount(account);
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return this.personsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonResponseDto> {
    return this.personsService.update(id, updatePersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<any> {
    return this.personsService.remove(id);
  }
}
