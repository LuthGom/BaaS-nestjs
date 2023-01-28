import { Exclude } from 'class-transformer';
import { CreatePersonDto } from './create-person.dto';
export class PersonResponseDto {
  name: string;
  cpf: string;
  address: object;
  cellphone: string;
  email: string;
  account: number;
  vd: number;
  password: string;
  createdAt: Date;

  @Exclude()
  _id: string;

  @Exclude()
  __v: string;

  constructor(partial: Partial<CreatePersonDto>) {
    Object.assign(this, partial);
  }
}
