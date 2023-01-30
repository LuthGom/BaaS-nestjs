import { Injectable } from '@nestjs/common';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class AuthService {
  constructor(private personsService: PersonsService) {}

  async validatePerson(email: string, pass?: string): Promise<any> {
    const person = await this.personsService.findOne(email);
    if (person && person[0].password === pass) {
      const { password, ...result } = person[0];
      return result;
    }
    return null;
  }
}
