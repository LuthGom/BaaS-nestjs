import Document from 'mongoose';

export interface Person extends Document {
  readonly name: string;
  readonly cpf: string;
  readonly address: object;
  readonly cellphone: string;
  readonly email: string;
  readonly account: number;
  readonly vd: number;
  readonly password: string;
  readonly saldo: number;
  createdAt: Date;
}

export interface IAddress {
  readonly zipCode: string;
  readonly street: string;
  readonly houseNumber: number;
  readonly city: string;
  readonly state: string;
}
