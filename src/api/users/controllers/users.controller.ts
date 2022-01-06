import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PasswordHelper } from '../../auth/password/password.helper';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly passwordHelper: PasswordHelper,
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  getUsers(@Req() req: Request) {
    return this.usersService.findByUsername(req.query.username);
  }

  @Post('')
  createPassword(@Body() body: any) {
    return this.passwordHelper.hashPassword(body.password);
  }
}
