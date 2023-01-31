import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    });
  }

  async validate(account: number, password: string): Promise<any> {
    const person = await this.authService.validatePerson(account, password);
    if (!person) {
      throw new UnauthorizedException();
    }
    return person;
  }
}
