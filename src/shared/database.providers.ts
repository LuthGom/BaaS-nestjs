import * as mongoose from 'mongoose';

const MONGO_DB_URL = process.env.MONGODB_URL;


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(MONGO_DB_URL),
  },
];
