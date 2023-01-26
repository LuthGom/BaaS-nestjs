import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [ConfigModule.forRoot(), PersonsModule],
})
export class AppModule {}
