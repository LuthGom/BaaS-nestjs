import { IAddress } from 'src/interfaces/persons.interface';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsStrongPassword,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { CpfValido } from '../validator-cpf';
export class CreatePersonDto {
  @MinLength(4, { message: 'Name must have at least 4 characters' })
  name: String;

  @Validate(CpfValido)
  cpf: String;

  @IsNotEmptyObject()
  address: IAddress;

  @Validate(IsNumberString, {
    message: 'Cellphone must be in a valid format with no "()" and no "-"',
  })
  cellphone: String;

  @IsEmail()
  email: String;

  account: String;

  @IsNotEmpty()
  @Length(6, 10, {
    message:
      'The password must have the minimum of 6 characthers and maximum 10 characthes ',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: String;

  createdAt: Date;
}
