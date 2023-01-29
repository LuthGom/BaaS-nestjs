import * as mongoose from 'mongoose';
import { Person } from 'src/interfaces/persons.interface';
import { geradorDeContas } from 'src/services/geradorDeContas';
mongoose.Promise;

const PersonSchema = new mongoose.Schema<Person>({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  address: { type: Object, required: true },
  cellphone: { type: String, required: true },
  email: { type: String, required: true },
  account: {type: Number, default: geradorDeContas()},
  vd: { type: Number, default: 1 },
  saldo: Number,
  password: String,
  createdAt: Date,
});

PersonSchema.pre<Person>('save', function (next) {
  next();
});

export default PersonSchema;
