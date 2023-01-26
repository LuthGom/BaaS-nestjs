import { Person, IAddress } from 'src/interfaces/persons.interface';
export class CreatePersonDto {
  name: String;
  cpf: String;
  address: IAddress;
  cellphone: String;
  email: String;
  account: String;
  password: String;
}
