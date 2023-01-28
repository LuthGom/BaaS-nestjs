import { CreatePersonDto } from 'src/persons/dto/create-person.dto';
import { PersonsService } from 'src/persons/persons.service';
import { geradorDeContas } from './geradorDeContas';

export class Verification {
  constructor(public personModel: PersonsService) {}

  allVerification(createPersonDto: CreatePersonDto): boolean {
    if (
      this.verificaCpf(createPersonDto.cpf) ||
      this.verificaEmail(createPersonDto.email) ||
      this.verificaAccount(createPersonDto)
    )
      return false;
    else return true;
  }

  async verificaCpf(cpf: string): Promise<string | boolean> {
    const person = this.personModel.findByCpf(cpf);
    if (!person) {
      return;
    } else {
      return "This CPf it's already in use.";
    }
  }
  async verificaEmail(email: string): Promise<string | boolean> {
    const person = this.personModel.findByEmail(email);
    if (!person) {
      return;
    } else {
      return "This Email it's already in use.";
    }
  }
  async verificaAccount(
    createPersonDto: CreatePersonDto,
  ): Promise<number | boolean> {
    const person = this.personModel.findByAccount(createPersonDto.account);
    if (!person) {
      return;
    } else {
      return (createPersonDto.account = geradorDeContas());
    }
  }
}
