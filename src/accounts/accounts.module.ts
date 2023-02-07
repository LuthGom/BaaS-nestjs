import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from 'src/shared/database.module';
import { personsProviders } from 'src/persons/persons.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, ...personsProviders],
  exports: [AccountsService],
})
export class AccountsModule {}
