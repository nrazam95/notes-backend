import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PasswordHelper } from '../../auth/password/password.helper';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly passwordHelper: PasswordHelper) {}

  @Get('')
  getUsers() {
    return 'Hello World!';
  }

  @Post('')
  createPassword(@Body() body: any) {
    return this.passwordHelper.hashPassword(body.password);
  }
}
