import { Inject, Injectable } from '@nestjs/common';
import { PersonsService } from 'src/persons/persons.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private personsService: PersonsService,
    private jwtService: JwtService,
  ) {}

  async validatePerson(email: string, pass?: string): Promise<any> {
    const person = await this.personsService.findOne(email);

    if (person && compare(pass, person[0].password)) {
      const { password, ...result } = person[0];
      return result;
    }
    return null;
  }
  async login(user) {
    const payload = { username: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
    };
  }
}
