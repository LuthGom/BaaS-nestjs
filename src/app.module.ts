import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonsModule } from './persons/persons.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [ConfigModule.forRoot(), PersonsModule, AuthModule, AccountsModule],
})
export class AppModule {}
