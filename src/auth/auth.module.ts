import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PersonsModule } from 'src/persons/persons.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PersonsModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
