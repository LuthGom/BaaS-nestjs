import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { DatabaseModule } from 'src/shared/database.module';
import { personsProviders } from './persons.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonsController],
  providers: [PersonsService, ...personsProviders],
})
export class PersonsModule {}
