import { Connection } from 'mongoose';
import PersonSchema from 'src/schemas/person.schema';
export const personsProviders = [
  {
    provide: 'PERSON_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Person', PersonSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
