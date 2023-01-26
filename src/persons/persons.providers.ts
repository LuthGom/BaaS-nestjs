import { Connection } from 'mongoose';
import PersonSchema from 'src/schemas/person.schema';
export const catsProviders = [
  {
    provide: 'PERSON_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Cat', PersonSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
