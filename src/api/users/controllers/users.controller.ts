import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';
import { GetUser } from 'src/api/auth/strategies/get-user.decorator';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { PasswordHelper } from '../../auth/password/password.helper';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly passwordHelper: PasswordHelper,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUsers(@GetUser() user: any) {
    const username: string = user.username;
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createPassword(@Body() body: any) {
    return this.passwordHelper.hashPassword(body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slug')
  getUser(@Param('slug') slug: string) {
    const username: string = slug;
    return this.usersService.findByUsername(username);
  }
}
