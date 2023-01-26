import Document from 'mongoose';

export interface Person extends Document {
  readonly name: string;
  readonly cpf: string;
  readonly address: object;
  readonly cellphone: string;
  readonly email: string;
  readonly account: string;
  readonly password: string;
}

export interface Address {
  readonly zipCode: string;
  readonly street: string;
  readonly houseNumber: number;
  readonly city: string;
  readonly state: string;
}
