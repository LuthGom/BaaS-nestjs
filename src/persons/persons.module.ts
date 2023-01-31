import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { DatabaseModule } from 'src/shared/database.module';
import { personsProviders } from './persons.providers';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [DatabaseModule],
  controllers: [PersonsController],
  providers: [PersonsService,AuthService,JwtService,...personsProviders],
  exports: [PersonsService],
})
export class PersonsModule {}
