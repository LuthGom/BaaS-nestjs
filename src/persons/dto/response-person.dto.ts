import { Exclude } from 'class-transformer';
import { CreatePersonDto } from './create-person.dto';
export class PersonResponseDto {

  @Exclude()
  _id: string;

  @Exclude()
  __v: string;

  constructor(partial: Partial<CreatePersonDto>) {
    Object.assign(this, partial);
  }
}