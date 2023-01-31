import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PersonsModule } from 'src/persons/persons.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({
  imports: [
    PersonsModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
