import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll() {
    return await this.accountsService.findAll();
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return await this.accountsService.findByCpf(cpf);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const account = await this.accountsService.findbyId(id);
    console.log(account);
    return account;
  }

  @Get(':account')
  async findByAccount(@Param('account') account: number) {
    const accountReturned = await this.accountsService.findByAccount(account);
    return accountReturned.map((account) => {
      return {
        name: account.name,
        cpf: account.cpf,
        account: account.cpf,
        vd: account.vd,
        saldo: account.saldo,
      };
    });
  }
}
