import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Req() req: Request): Observable<any> {
    const payload = {
      username: req.query.username,
      password: req.query.password,
      email: req.query.email,
    };
    return from(this.authService.register(payload));
  }

  @Post('login')
  login(@Req() req: Request): Observable<any> {
    const payload = {
      username: req.query.username,
      password: req.query.password,
    };
    return from(this.authService.login(payload));
  }
}
